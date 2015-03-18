// jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, onevar:true, strict:true, undef:true, unused:strict, curly:true, node:true, evil:true

"use strict";

var crypto = require("crypto"),
    girdle = require("girdle"),
    fs = require("fs"),
    p = require("path");

function copy(orig_path, new_path, cb)
{
    var read_stream  = fs.createReadStream(orig_path),
        write_stream = fs.createWriteStream(new_path),
        closed;
    
    function done(err)
    {
        if (!closed) {
            read_stream.close();
            write_stream.close();
            closed = true;
        }
        /// Prevent double calls on errors and closing.
        if (cb) {
            cb(err);
            cb = null;
        }
    }
    
    read_stream.on("error",  done);
    write_stream.on("error", done);
    write_stream.on("close", done);
    
    read_stream.pipe(write_stream);
}

function exists(paths, cb)
{
    if (typeof paths === "string") {
        paths = [paths];
    }
    
    girdle.async_loop(paths, function ondone()
    {
        cb(true);
    }, function oneach(path, next)
    {
        fs.exists(path, function oncheck(exists)
        {
            if (exists) {
                next();
            } else {
                cb(false);
            }
        });
    });
}

function rm(paths, cb)
{
    var errs;
    
    if (typeof paths === "string") {
        paths = [paths];
    }
    
    girdle.async_loop(paths, function ondone()
    {
        if (cb) {
            cb(errs);
        }
    }, function oneach(path, next, i)
    {
        fs.unlink(path, function oncheck(err)
        {
            if (err) {
                if (!errs) {
                    errs = [];
                }
                errs[i] = err;
            }
            setImmediate(next);
        });
    });
}

function filesize(path, cb)
{
    fs.stat(path, function onstat(err, stats)
    {
        if (err) {
            cb(null);
        } else {
            cb(stats.size);
        }
    });
}

function modified_time(path, cb)
{
    fs.stat(path, function onstat(err, stats)
    {
        if (err) {
            cb(null);
        } else {
            cb(stats.mtime && stats.mtime.getTime ? stats.mtime.getTime() : null);
        }
    });
}

function is_dir(path, cb)
{
    fs.stat(path, function onstat(err, stats)
    {
        if (err) {
            cb(err);
        } else {
            cb(null, stats.isDirectory());
        }
    });
}

function dir_exists(path, cb)
{
    fs.exists(path, function onexists(exists)
    {
        if (!exists) {
            return cb(null, exists);
        }
        
        is_dir(path, function onres(err, dir)
        {
            if (err) {
                cb(err);
            } else if (dir) {
                cb(null, true);
            } else {
                cb({error: "File exists; not directory."});
            }
        });
    });
}

function make_path(path, cb)
{
    var parts = path.split(p.sep),
        build_path = "";
    
    girdle.async_loop(parts, cb, function onpart(part, next)
    {
        if (!part) {
            build_path = p.join(build_path, "/");
            return next();
        }
        build_path = p.join(build_path, part);
        make_dir_if_none(build_path, next);
    });
}


function make_dir_if_none(path, cb)
{
    cb = cb || function () {};
    
    dir_exists(path, function onres(err, exists)
    {
        if (err) {
            cb(err);
        } else if (exists) {
            cb();
        } else if (!exists) {
            fs.mkdir(path, cb);
        }
    });
}

function get_all_of(path, dirs, cb)
{
    var paths = [];
    
    fs.readdir(path, function onread(err, files)
    {
        if (err) {
            throw err;
        }
        
        girdle.async_loop(files, function ondone()
        {
            cb(paths);
        }, function oneach(file, next)
        {
            var new_path = p.join(path, file);
            
            is_dir(new_path, function onres(err, dir) {
                if (!err && ((dirs && dir) || (!dirs && !dir))) {
                    paths[paths.length] = new_path;
                }
                setImmediate(next);
            });
        });
    });
}

function get_all_dirs(path, cb)
{
    get_all_of(path, true, cb);
}

function get_all_files(path, cb)
{
    get_all_of(path, false, cb);
}

function read_JSON(path, cb)
{
    /// Is this async?
    if (cb) {
        fs.readFile(path, "utf8", function onread(err, data)
        {
            cb(girdle.parse_json(data));
        });
    } else {
        /// If the file does not exist, it will throw.
        try {
            return girdle.parse_json(fs.readFileSync(path, "utf8"));
        } catch (e) {}
    }
}

function md5(path, cb)
{
    console.log("Depreciated: Use .hash(path, [algorithm, [enc,]] cb)");
    hash(path, cb);
}

function hash(path, algorithm, enc, cb)
{
    var hasher,
        read_stream = fs.ReadStream(path);
    
    if (typeof algorithm === "function") { /// Are hash and enc missing?
        cb = algorithm;
        algorithm = "md5";
        enc = "hex";
    } else if (typeof enc === "function") { /// Is enc missing?
        cb = enc;
        enc = "hex";
    }
    
    hasher = crypto.createHash(algorithm);
    
    read_stream.on("data", function ondata(data)
    {
        hasher.update(data);
    });
    
    read_stream.on("end", function onend()
    {
        cb(hasher.digest(enc));
    });
}

function rm_r(path, cb)
{
    function imcb()
    {
        setImmediate(cb);
    }
    
    cb = cb || function () {};
    
    is_link(path, function onres(err, link)
    {
        if (err) {
            return cb(err);
        }
        if (link) {
            /// Just remove the link, don't enter into symlink directories.
            fs.unlink(path, imcb);
        } else {
            is_dir(path, function onres(err, dir)
            {
                if (err) {
                    return cb(err);
                }
                if (dir) {
                    /// Delete everything in it.
                    fs.readdir(path, function onread(err, files)
                    {
                        if (err) {
                            return cb(err);
                        }
                        files.forEach(function oneach(file, i)
                        {
                            files[i] = p.join(path, file);
                        });
                        
                        girdle.async_loop(files, function ondel()
                        {
                            fs.rmdir(path, imcb);
                        }, rm_r);
                    });
                } else {
                    fs.unlink(path, imcb);
                }
            });
        }
    });
}

function realbase(path)
{
    return p.basename(path, p.extname(path));
}

function is_link(path, cb)
{
    fs.lstat(path, function onstat(err, stats)
    {
        if (err) {
            cb(err);
        } else {
            cb(null, stats.isSymbolicLink());
        }
    });
}

module.exports = {
    copy: copy,
    dir_exists: dir_exists,
    exists: exists,
    filesize: filesize,
    fs: fs,
    get_all_dirs: get_all_dirs,
    get_all_files: get_all_files,
    hash: hash,
    is_dir: is_dir,
    is_link: is_link,
    make_dir_if_none: make_dir_if_none,
    make_path: make_path,
    md5: md5,
    modified_time: modified_time,
    p: p,
    read_JSON: read_JSON,
    realbase: realbase,
    rm_r: rm_r,
    rm: rm,
};
