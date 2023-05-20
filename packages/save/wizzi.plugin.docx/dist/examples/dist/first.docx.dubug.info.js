// 1/3/2021:22:35:53  by C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\dist\node_modules\wizzi-mtree\lib\loader\debugInfoBuilder.js
$.n(); // set the context state to NodeContext
var $0 = {}; // the root node of the MTree buildup
var $1 = { n: "docx", v: "first", r: 1, c: 1, s: "f1", u: "f1",  }; //120
$.a($0, $1, 5);
$.s("f1");
var H2_Size = 42; //122
var Big_Size = 30; //123
var Normal_Size = 22; //124
var P_spacing_before = 20 * 72 * 0.05; //125
var P_spacing_before_h2 = 20 * 72 * 0.3; //126
var P_spacing_after = 20 * 72 * 0.025; //127
var P_spacing_after_h2 = 20 * 72 * 0.05; //128
$.n();
var $3 = { n: "styles", v: "", r: 12, c: 5, s: "f1", u: "f1",  }; //129
$.a($1, $3, 16);
var $4 = { n: "default", v: "", r: 13, c: 9, s: "f1", u: "f1",  }; //130
$.a($3, $4, 18);
var $5 = { n: "style-def", v: "heading1", r: 14, c: 13, s: "f1", u: "f1",  }; //131
$.a($4, $5, 20);
var $6 = { n: "run", v: "", r: 15, c: 17, s: "f1", u: "f1",  }; //132
$.a($5, $6, 22);
var $7 = { n: "size", v: "56", r: 16, c: 21, s: "f1", u: "f1",  }; //133
$.a($6, $7, 24);
var $8 = { n: "bold", v: "", r: 17, c: 21, s: "f1", u: "f1",  }; //134
$.a($6, $8, 26);
var $9 = { n: "style-def", v: "heading2", r: 19, c: 13, s: "f1", u: "f1",  }; //135
$.a($4, $9, 28);
var $10 = { n: "run", v: "", r: 20, c: 17, s: "f1", u: "f1",  }; //136
$.a($9, $10, 30);
var $11 = { n: "size", v: "38", r: 21, c: 21, s: "f1", u: "f1",  }; //137
$.a($10, $11, 32);
var $12 = { n: "bold", v: "", r: 22, c: 21, s: "f1", u: "f1",  }; //138
$.a($10, $12, 34);
var $13 = { n: "style-def", v: "heading3", r: 24, c: 13, s: "f1", u: "f1",  }; //139
$.a($4, $13, 36);
var $14 = { n: "run", v: "", r: 25, c: 17, s: "f1", u: "f1",  }; //140
$.a($13, $14, 38);
var $15 = { n: "size", v: "24", r: 26, c: 21, s: "f1", u: "f1",  }; //141
$.a($14, $15, 40);
var $16 = { n: "bold", v: "", r: 27, c: 21, s: "f1", u: "f1",  }; //142
$.a($14, $16, 42);
var $17 = { n: "italic", v: "", r: 28, c: 21, s: "f1", u: "f1",  }; //143
$.a($14, $17, 44);
$.s("f1");
function apply_Style($parent,apath) {
    if (apath.indexOf('h2') > -1 || apath.indexOf('h1') > -1 || apath.indexOf('h3') > -1) { //146
        $.n();
        var $20 = { n: "size", v: $.ip("f1", "${H2_Size}", "string", 49, false), r: 33, c: 13, s: "f1", u: "f1",  }; //147
        $.a($parent, $20, 50);
    }
    else if (apath.indexOf('big') > -1) { //148
        $.n();
        var $22 = { n: "size", v: $.ip("f1", "${Big_Size}", "string", 54, false), r: 35, c: 13, s: "f1", u: "f1",  }; //149
        $.a($parent, $22, 55);
    }
    else {
        $.n();
        var $24 = { n: "size", v: $.ip("f1", "${Normal_Size}", "string", 59, false), r: 37, c: 13, s: "f1", u: "f1",  }; //151
        $.a($parent, $24, 60);
    }
    $.s("f1");
    if (apath.indexOf('strong') > -1) { //152
        $.n();
        var $26 = { n: "bold", v: "true", r: 39, c: 13, s: "f1", u: "f1",  }; //153
        $.a($parent, $26, 66);
    }
}
$.s("f1");
function emit_H2($parent,node,apath) {
    if (node.value && node.value.length > 0) { //157
        $.n();
        var $29 = { n: "+", v: $.ip("f1", "${node.value}", "string", 73, false), r: 46, c: 13, s: "f1", u: "f1",  }; //158
        $.a($parent, $29, 74);
        $.s("f1");
        apply_Style($29,apath);
        $.s("f1");
        var nodeChild_count31 = node.children.length; //161
        var nodeChild_count = node.children.length; //161
        for (var i31=0; i31<nodeChild_count31; i31++) { //161
            var nodeChild = node.children[i31]; //161
            var nodeChild_index = i31; //161
            $.s("f1");
            itemText($parent,nodeChild,apath);
            $.s("f1");
        }
    }
    else {
        $.s("f1");
        var nodeChild_count34 = node.children.length; //166
        var nodeChild_count = node.children.length; //166
        for (var i34=0; i34<nodeChild_count34; i34++) { //166
            var nodeChild = node.children[i34]; //166
            var nodeChild_index = i34; //166
            $.s("f1");
            itemText($parent,nodeChild,apath);
            $.s("f1");
        }
    }
}
$.s("f1");
function itemText($parent,node,apath) {
    apath.push(node.name)
    if (node.name == 'p') { //174
        $.n();
        var $39 = { n: "p", v: "", r: 64, c: 13, s: "f1", u: "f1",  }; //175
        $.a($parent, $39, 107);
        var $40 = { n: "spacing", v: "", r: 65, c: 17, s: "f1", u: "f1",  }; //176
        $.a($39, $40, 109);
        var $41 = { n: "before", v: $.ip("f1", "${P_spacing_before}", "string", 110, false), r: 66, c: 21, s: "f1", u: "f1",  }; //177
        $.a($40, $41, 111);
        var $42 = { n: "after", v: $.ip("f1", "${P_spacing_after}", "string", 112, false), r: 67, c: 21, s: "f1", u: "f1",  }; //178
        $.a($40, $42, 113);
        $.s("f1");
        var nodeChild_count43 = node.children.length; //179
        var nodeChild_count = node.children.length; //179
        for (var i43=0; i43<nodeChild_count43; i43++) { //179
            var nodeChild = node.children[i43]; //179
            var nodeChild_index = i43; //179
            $.s("f1");
            itemText($39,nodeChild,apath);
            $.s("f1");
        }
    }
    else if (node.name == 'h2' || node.name == 'h1' || node.name == 'h3') { //183
        $.s("f1");
        if (apath.indexOf('p') < 0 && apath.indexOf('li') < 0) { //184
            $.n();
            var $47 = { n: "p", v: "", r: 74, c: 17, s: "f1", u: "f1",  }; //185
            $.a($parent, $47, 130);
            $.s("f1");
            emit_H2($47,node,apath);
            $.s("f1");
        }
        else {
            $.s("f1");
            emit_H2($parent,node,apath);
            $.s("f1");
        }
    }
    else if (node.name == 'strong') { //193
        $.s("f1");
        if (node.value && node.value.length > 0) { //194
            $.n();
            var $53 = { n: "+", v: $.ip("f1", "${node.value}", "string", 145, false), r: 84, c: 17, s: "f1", u: "f1",  }; //195
            $.a($parent, $53, 146);
            $.s("f1");
            apply_Style($53,apath);
            $.s("f1");
            var nodeChild_count55 = node.children.length; //198
            var nodeChild_count = node.children.length; //198
            for (var i55=0; i55<nodeChild_count55; i55++) { //198
                var nodeChild = node.children[i55]; //198
                var nodeChild_index = i55; //198
                $.s("f1");
                itemText($parent,nodeChild,apath);
                $.s("f1");
            }
        }
        else {
            $.s("f1");
            var nodeChild_count58 = node.children.length; //203
            var nodeChild_count = node.children.length; //203
            for (var i58=0; i58<nodeChild_count58; i58++) { //203
                var nodeChild = node.children[i58]; //203
                var nodeChild_index = i58; //203
                $.s("f1");
                itemText($parent,nodeChild,apath);
                $.s("f1");
            }
        }
    }
    else if (node.name == 'big') { //207
        $.s("f1");
        if (node.value && node.value.length > 0) { //208
            $.n();
            var $62 = { n: "+", v: $.ip("f1", "${node.value}", "string", 177, false), r: 98, c: 17, s: "f1", u: "f1",  }; //209
            $.a($parent, $62, 178);
            $.s("f1");
            apply_Style($62,apath);
            $.s("f1");
            var nodeChild_count64 = node.children.length; //212
            var nodeChild_count = node.children.length; //212
            for (var i64=0; i64<nodeChild_count64; i64++) { //212
                var nodeChild = node.children[i64]; //212
                var nodeChild_index = i64; //212
                $.s("f1");
                itemText($parent,nodeChild,apath);
                $.s("f1");
            }
        }
        else {
            $.s("f1");
            var nodeChild_count67 = node.children.length; //217
            var nodeChild_count = node.children.length; //217
            for (var i67=0; i67<nodeChild_count67; i67++) { //217
                var nodeChild = node.children[i67]; //217
                var nodeChild_index = i67; //217
                $.s("f1");
                itemText($parent,nodeChild,apath);
                $.s("f1");
            }
        }
    }
    else if (node.name == '+' || node.name == '++' || node.name == 'span') { //221
        $.n();
        var $70 = { n: "+", v: $.ip("f1", "${node.value}", "string", 207, false), r: 111, c: 13, s: "f1", u: "f1",  }; //222
        $.a($parent, $70, 208);
        $.s("f1");
        apply_Style($70,apath);
        $.s("f1");
    }
    else {
        $.n();
        var $73 = { n: $.ip("f1", "${node.name}", "string", 215, false), v: $.ip("f1", "${node.value}", "string", 215, false), r: 115, c: 14, s: "f1", u: "f1",  }; //226
        $.a($parent, $73, 216);
    }
}
$.n();
var $74 = { n: "section", v: "", r: 117, c: 5, s: "f1", u: "f1",  }; //227
$.a($1, $74, 221);
var $75 = { n: "h1", v: $.ip("f1", "${beba.category}", "string", 222, false), r: 118, c: 9, s: "f1", u: "f1",  }; //228
$.a($74, $75, 223);
$.s("f1");
var item_count76 = beba.items.length; //229
var item_count = beba.items.length; //229
for (var i76=0; i76<item_count76; i76++) { //229
    var item = beba.items[i76]; //229
    var item_index = i76; //229
    if (item.Categoria == "Bambino") { //230
        $.n();
        var $78 = { n: "h2", v: $.ip("f1", "${item.Titolo}", "string", 232, false), r: 121, c: 17, s: "f1", u: "f1",  }; //231
        $.a($74, $78, 233);
        var $79 = { n: "h3", v: $.ip("f1", "Dalla settimana ${item.SettimanaDal} alla ${item.SettimanaAl}", "string", 234, false), r: 122, c: 17, s: "f1", u: "f1",  }; //232
        $.a($74, $79, 235);
        var $80 = { n: "p", v: $.ip("f1", "${item.Abstract}", "string", 236, false), r: 123, c: 17, s: "f1", u: "f1",  }; //233
        $.a($74, $80, 237);
        var $81 = { n: "p", v: $.ip("f1", "Url ${item.url}", "string", 238, false), r: 125, c: 17, s: "f1", u: "f1",  }; //234
        $.a($74, $81, 239);
        $.s("f1");
        var child_count82 = item.TestoJson.children.length; //235
        var child_count = item.TestoJson.children.length; //235
        for (var i82=0; i82<child_count82; i82++) { //235
            var child = item.TestoJson.children[i82]; //235
            var child_index = i82; //235
            $.s("f1");
            itemText($74,child,[]);
            $.s("f1");
        }
    }
}