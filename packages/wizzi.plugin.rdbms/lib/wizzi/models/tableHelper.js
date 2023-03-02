/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.rdbms\.wizzi-override\lib\wizzi\models\tableHelper.js.ittf
*/
'use strict';
var md = module.exports = {};
md.ArgumentsToString = function(columns) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        sb.push(c.ClrTypeShort);
        sb.push(" ");
        sb.push(c.argumentName);
        if (i < i_len - 1) {
            sb.push(", ");
        }
    }
    return sb.join();
}
;
md.ArgumentsControllerToString = function(columns) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        sb.push(c.ClrTypeShort);
        if (c.DomainDataType.IsBoolean) {
            sb.push("?");
        }
        sb.push(" ");
        sb.push(c.argumentName);
        if (i < i_len - 1) {
            sb.push(", ");
        }
    }
    return sb.join();
}
;
md.ParametersToString = function(columns) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        sb.push(c.argumentName);
        if (i < i_len - 1) {
            sb.push(", ");
        }
    }
    return sb.join();
}
;
md.ParametersToStringTrace = function(columns) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        sb.push(i > 0 ? '"; ' : '"');
        sb.push(c.argumentName);
        sb.push(': " + ');
        sb.push(c.argumentName);
        if (i < i_len - 1) {
            sb.push(" + ");
        }
    }
    return sb.join();
}
;
md.ParametersToString_aka_Properties = function(columns) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        sb.push("this." + c.wzName);
        if (i < i_len - 1) {
            sb.push(", ");
        }
    }
    return sb.join();
}
;
md.ParametersToStringController = function(columns) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        sb.push(c.argumentName);
        if (c.DomainDataType.IsBoolean) {
            sb.push("_check");
        }
        if (i < i_len - 1) {
            sb.push(", ");
        }
    }
    return sb.join();
}
;
md.ParametersToStringInstance = function(columns, instance) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        sb.push(instance + ".");
        sb.push(c.wzName);
        if (i < i_len - 1) {
            sb.push(", ");
        }
    }
    return sb.join();
}
;
md.ParametersInstanceToStringTrace = function(columns, instance) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        sb.push('"');
        sb.push(c.argumentName);
        sb.push(': " + ');
        sb.push(instance + ".");
        sb.push(c.wzName);
        if (i < i_len - 1) {
            sb.push(" + ");
        }
    }
    return sb.join();
}
;
md.SqlColumnsToString = function(columns, separator, quoted) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        if (quoted) {
            sb.push('"');
        }
        sb.push(c.wzName);
        if (quoted) {
            sb.push('"');
        }
        if (i < i_len - 1) {
            sb.push(separator);
        }
    }
    return sb.join();
}
;
md.PropertiesToString = function(columns, separator, prefix) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        if (prefix != null) {
            sb.push(prefix);
        }
        sb.push(c.wzName);
        if (i < i_len - 1) {
            sb.push(separator);
        }
    }
    return sb.join();
}
;
md.FieldsToString = function(columns, separator) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        sb.push(c.FieldName);
        if (i < i_len - 1) {
            sb.push(separator);
        }
    }
    return sb.join();
}
;
md.TestValuesToString = function(columns, separator) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        sb.push(md.TestValue(c));
        if (i < i_len - 1) {
            sb.push(separator);
        }
    }
    return sb.join();
}
;
md.TestValue = function(tc) {
    if (tc.ClrType == "String") {
        return "\"Hello\"";
    }
    else if (tc.ClrType == "Int32") {
        return 1;
    }
    else if (tc.ClrType == "Int64") {
        return 1000;
    }
    else if (tc.ClrType == "DateTime") {
        return "DateTime.Now";
    }
    else {
    }
}
;
md.ConcatTextInstance = function(columns, instance, separator) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        sb.push(instance + ".");
        sb.push(c.wzName);
        if (i < i_len - 1 && separator != null && separator.Length > 0) {
            sb.push(" + ");
            sb.push('"' + separator + '"');
        }
    }
    return sb.join();
}
;
md.ColumnsToVelocityQueryString = function(columns, instance, startchar) {
    var sb = [];
    var nextchar = startchar;
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        sb.push(nextchar);
        sb.push(tc.wzName.toLower());
        sb.push("=");
        sb.push("${");
        sb.push(instance);
        sb.push(".");
        sb.push(tc.wzName);
        sb.push("}");
        nextchar = "&";
    }
    return sb.join();
}
;
md.ColumnsToAndCondition = function(columns, booloperator, columntemplate, values) {
    var sb = [];
    var i, i_items=columns, i_len=columns.length, c;
    for (i=0; i<i_len; i++) {
        c = columns[i];
        var text = string.Format(columntemplate, c.wzName);
        sb.push(text);
        sb.push(" " + booloperator + " ");
        sb.push(values[i]);
        if (i < columns.Count - 1) {
            sb.push(" && ");
        }
    }
    return sb.join();
}
;
