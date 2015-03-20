// A little string utility... no biggie
app.factory('stringUtil', function() {
    return {
        startsWith: function(str, subStr) {
            str = str || '';
            return str.slice(0, subStr.length) === subStr;
        }
    };
});