// 1
callback.call(this, JSON.parse(localStorage.getItem(this._dbName)));

// 2
var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
};

for (i = 0, l = data.length; i < l; i++) {}