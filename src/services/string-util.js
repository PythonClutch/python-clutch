// A little string utility... no biggie
app.factory('stringUtil', function() {
    return {
        isOnly: function(str, subStr) {
            str = str || '';
            return str === subStr;
        }
    };
});