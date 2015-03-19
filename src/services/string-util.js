// A little string utility... no biggie
app.factory('stringUtil', function() {
    return {
        startsWith: function(str, subStr) {
            str = str || '';
            console.log(str);
            console.log(subStr);
            return str.slice(0, subStr.length) === subStr;
        }
    };
});