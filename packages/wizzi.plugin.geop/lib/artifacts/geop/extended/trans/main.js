/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.geop\.wizzi-override\lib\artifacts\geop\extended\trans\main.js.ittf
    utc time: Sun, 16 Jul 2023 13:33:00 GMT
*/
'use strict';


var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineParser = verify.lineParser;
var errors = require('../../../../../errors');
var g_namespace = 'states.world';

var md = module.exports = {};
var myname = 'wizzi.plugin.geop.geop.extended.trans.main';

md.trans = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'geop') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "geop". Received: ' + model.wzElement, model));
    }
    
    try {
        var transformedModel = {
            authors: [
                
            ], 
            periods: [
                
            ], 
            events: [
                
            ], 
            alliances: [
                
            ], 
            treaties: [
                
            ], 
            acts: [
                
            ], 
            agents: [
                
            ], 
            persons: [
                
            ], 
            states: [
                
            ]
         };
        var i, i_items=model.items, i_len=model.items.length, item;
        for (i=0; i<i_len; i++) {
            item = model.items[i];
            doitem(item, transformedModel)
        }
        delete transformedModel.current
        delete transformedModel.ns
        callback(null, transformedModel)
    } 
    catch (ex) {
        return callback(ex);
    } 
}
;

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.geop/lib/artifacts/geop/extended/trans/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
function doitem(parent, resultObj) {
    var f = functors[parent.wzElement];
    if (f) {
        f(parent, resultObj)
    }
    else {
        resultObj['unknown_tag_' + parent.wzElement] = parent.wzName;
    }
}
var functors = {};
functors.namespace = function(parent, resultObj) {
    resultObj.ns = parent.wzName;
    console.log('functors.namespace', __filename);
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (child.wzElement == "author") {
            resultObj.ns_author = child.wzName;
        }
        else {
            doitem(child, resultObj)
        }
    }
    resultObj.ns = 'global';
    resultObj.ns_author = 'global';
}
;
functors.contents = function(node, parentObj, resultObj) {
    var i, i_items=node.items, i_len=node.items.length, child;
    for (i=0; i<i_len; i++) {
        child = node.items[i];
        
        // functors.contents is called when contents only are expected
        if (!fillContents(child, parentObj, resultObj)) {
        }
    }
}
;
function fillContents(node, currentObj, resultObj) {
    if (!currentObj.contents) {
        console.log(currentObj.kind, __filename);
        console.log(currentObj.id, __filename);
        return ;
    }
    if (node.wzElement == "text") {
        currentObj.contents.push({
            line: node.wzName
         })
    }
    else if (node.wzElement == 'img') {
        currentObj.contents.push({
            img: node.wzName
         })
    }
    else if (node.wzElement == 'quote') {
        currentObj.contents.push({
            quote: fillQuote(node, currentObj, resultObj)
         })
    }
    else if (node.wzElement == 'comment') {
        currentObj.contents.push({
            comment: functors.comment(node, resultObj)
         })
    }
    else if (node.wzElement == 'example') {
        currentObj.contents.push({
            example: functors.comment(node, resultObj)
         })
    }
    else if (node.wzElement == 'concept' && currentObj.kind == 'concept') {
        var savens = resultObj.ns;
        resultObj.ns = currentObj.id;
        functors.concept(node, resultObj)
        resultObj.ns = savens;
        currentObj.contents.push({
            concept: currentObj.id + '.' + node.wzName
         })
    }
    else if (node.wzElement == 'relatedconcept') {
        var rconceptObj = {
            kind: 'rconcept', 
            id: node.wzName, 
            contents: [
                
            ]
         };
        var i, i_items=node.items, i_len=node.items.length, child;
        for (i=0; i<i_len; i++) {
            child = node.items[i];
            if (!fillContents(child, rconceptObj, resultObj)) {
            }
            else {
            }
        }
        currentObj.contents.push(rconceptObj)
        resultObj.relations.push({
            kind: 'rconcept', 
            from: currentObj.id, 
            to: node.wzName
         })
    }
    else if (node.wzElement == 'relatedarticle') {
        var rarticleObj = {
            kind: 'rarticle', 
            id: node.wzName, 
            contents: [
                
            ]
         };
        var i, i_items=node.items, i_len=node.items.length, child;
        for (i=0; i<i_len; i++) {
            child = node.items[i];
            if (!fillContents(child, rarticleObj, resultObj)) {
            }
            else {
            }
        }
        currentObj.contents.push(rarticleObj)
        resultObj.relations.push({
            kind: 'rarticle', 
            from: currentObj.id, 
            to: node.wzName
         })
    }
    else {
        return true;
    }
}
function fillQuote(node, currentObj, resultObj) {
    var quoteObj = {
        author: (resultObj.ns_author || 'global'), 
        lines: [
            
        ]
     };
    var i, i_items=node.items, i_len=node.items.length, child;
    for (i=0; i<i_len; i++) {
        child = node.items[i];
        if (child.wzElement == 'text') {
            quoteObj.lines.push(child.wzName)
        }
        else if (child.wzElement == 'img') {
            quoteObj.lines.push({
                img: child.wzName
             })
        }
        else if (child.wzElement == 'author') {
            quoteObj.author = child.wzName;
            var j, j_items=child.items, j_len=child.items.length, item;
            for (j=0; j<j_len; j++) {
                item = child.items[j];
                if (item.wzElement == 'text') {
                    quoteObj.lines.push(item.wzName)
                }
                else {
                    quoteObj.unknown = item.wzElement;
                }
            }
        }
        else if (child.wzElement == 'page') {
            quoteObj.page = child.wzName;
        }
        else if (child.wzElement == 'eloc') {
            quoteObj.eloc = child.wzName;
        }
        else if (child.wzElement == 'epage') {
            quoteObj.epage = child.wzName;
        }
        else if (child.wzElement == 'book') {
            quoteObj.book = child.wzName;
        }
        else if (child.wzElement == 'article') {
            quoteObj.article = child.wzName;
        }
        else if (child.wzElement == 'comment') {
            quoteObj.comment = functors.comment(child, resultObj)
            ;
        }
        else if (child.wzElement == 'quote') {
            quoteObj.lines.push({
                quote: fillQuote(child, currentObj, resultObj)
             })
        }
        else {
            quoteObj.unknown = child.wzElement + '/' + child.wzName;
        }
    }
    return quoteObj;
}
functors.period = function(field, parentObj, resultObj) {
    var periodObj = {
        title: field.wzName, 
        contents: [
            
        ]
     };
    functors.contents(field, periodObj, resultObj)
}
;
functors.author = function(parent, resultObj) {
    var authorObj = {
        id: parent.wzName, 
        foundations: [
            
        ], 
        opinions: [
            
        ], 
        contents: [
            
        ]
     };
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (child.wzElement == "fullname") {
            authorObj.fullname = child.wzName;
        }
        else if (child.wzElement == "born") {
            authorObj.born = createEvent(child);
        }
        else if (child.wzElement == "died") {
            authorObj.died = createEvent(child);
        }
        else if (child.wzElement == "avatar") {
            authorObj.avatar = child.wzName;
        }
        else if (child.wzElement == "curriculum") {
            authorObj.curriculum = child.wzName;
        }
        else if (!fillContents(child, authorObj, resultObj)) {
        }
        else if (['field', 'approach', 'theory', 'concept'].indexOf(child.wzElement) > -1) {
            var concept = getOrCreateConcept(resultObj, child.wzElement, child.wzName);
            if (concept) {
                fillConcept(child, resultObj, concept);
                concept.founders.push(parent.wzName)
                authorObj.foundations.push({
                    kind: child.wzElement, 
                    id: child.wzName
                 })
            }
        }
        else {
            newitems.push(child)
        }
    }
    resultObj.authors.push(authorObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
}
;
functors.authorsgroup = function(parent, resultObj) {
    var authorsGroupObj = {
        id: parent.wzName
     };
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (child.wzElement == "fullname") {
            authorsGroupObj.fullname = child.wzName;
        }
        else if (child.wzElement == "born") {
        }
        else if (child.wzElement == "died") {
        }
        else {
            newitems.push(child)
        }
    }
    resultObj.authorsGroups.push(authorsGroupObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
}
;
functors.war = function(parent, resultObj) {
    functors.event(parent, resultObj, 'war')
}
;
functors.event = function(parent, resultObj, kind) {
    var eventObj = {
        id: parent.wzName, 
        kind: kind || 'event', 
        ns: g_namespace, 
        contents: [
            
        ]
     };
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (!titleDateWikiContents(child, eventObj, resultObj)) {
        }
        else {
            eventObj['unknown_tag_' + child.wzElement] = child.wzName;
        }
    }
    if (!eventObj.title) {
        eventObj.title = {
            text: eventObj.id
         };
    }
    resultObj.events.push(eventObj)
}
;
functors.period = function(parent, resultObj, kind) {
    var periodObj = {
        id: parent.wzName, 
        kind: kind || 'period', 
        ns: g_namespace, 
        contents: [
            
        ]
     };
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (!titleDateWikiContents(child, periodObj, resultObj)) {
        }
        else {
            periodObj['unknown_tag_' + child.wzElement] = child.wzName;
        }
    }
    resultObj.periods.push(periodObj)
}
;
functors.alliance = function(parent, resultObj, kind) {
    var allianceObj = {
        id: parent.wzName, 
        kind: 'alliance', 
        ns: g_namespace, 
        signatures: [
            
        ], 
        parties: [
            
        ], 
        contents: [
            
        ]
     };
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (!titleDateWikiContents(child, allianceObj, resultObj)) {
        }
        else if (child.wzElement == "context") {
            allianceObj.context = createDiplomacyContext(child)
            ;
        }
        else if (child.wzElement == "friends") {
            allianceObj.friends = createStateGroup(child);
        }
        else if (child.wzElement == "enemies") {
            allianceObj.enemies = createStateGroup(child);
        }
        else if (child.wzElement == "signature") {
            allianceObj.signatures.push(createSignature(child))
        }
        else if (child.wzElement == "party") {
            alliances.parties.push(child.wzName)
        }
        else {
            allianceObj['unknown_tag_' + child.wzElement] = child.wzName;
        }
    }
    resultObj.alliances.push(allianceObj)
}
;
functors.treaty = function(parent, resultObj, kind) {
    var treatyObj = {
        id: parent.wzName, 
        kind: 'treaty', 
        ns: g_namespace, 
        signatures: [
            
        ], 
        parties: [
            
        ], 
        mediators: [
            
        ], 
        contents: [
            
        ]
     };
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (!titleDateWikiContents(child, treatyObj, resultObj)) {
        }
        else if (child.wzElement == "context") {
            treatyObj.context = createDiplomacyContext(child)
            ;
        }
        else if (child.wzElement == "signature") {
            treatyObj.signatures.push(createSignature(child))
        }
        else if (child.wzElement == "party") {
            treatyObj.parties.push(child.wzName)
        }
        else if (child.wzElement == "mediator") {
            treatyObj.mediators.push(child.wzName)
        }
        else {
            treatyObj['unknown_tag_' + child.wzElement] = child.wzName;
        }
    }
    resultObj.treaties.push(treatyObj)
}
;
function createSignature(parent) {
    var resultObj = {
        parties: [
            
        ]
     };
    var i, i_items=parent.items, i_len=parent.items.length, item;
    for (i=0; i<i_len; i++) {
        item = parent.items[i];
        if (item.wzElement == "party") {
            resultObj.parties.push(item.wzName)
        }
        else if (item.wzElement == "date") {
            resultObj.date = createDate(item);
        }
        else {
            resultObj['unknown_tag_' + item.wzElement] = item.wzName;
        }
    }
    return resultObj;
}
function createStateGroup(parent) {
    var resultObj = [];
    var i, i_items=parent.items, i_len=parent.items.length, item;
    for (i=0; i<i_len; i++) {
        item = parent.items[i];
        if (item.wzElement == "state") {
            resultObj.push(item.wzName)
        }
        else {
            resultObj.push('unknown_tag_' + item.wzElement + '/' + item.wzName)
        }
    }
    return resultObj;
}
function createDiplomacyContext(parent) {
    var resultObj = [];
    var i, i_items=parent.items, i_len=parent.items.length, item;
    for (i=0; i<i_len; i++) {
        item = parent.items[i];
        if (['war','treaty','alliance'].indexOf(item.wzElement) > -1) {
            resultObj.push({
                key: item.wzElement, 
                value: item.wzName
             })
        }
        else {
            resultObj.push('unknown_tag_' + item.wzElement + '/' + item.wzName)
        }
    }
    return resultObj;
}
functors.act = function(parent, resultObj, kind) {
    var actObj = {
        id: parent.wzName, 
        kind: kind || 'act', 
        ns: g_namespace, 
        contents: [
            
        ]
     };
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (!titleDateWikiContents(child, actObj, resultObj)) {
        }
        else if (child.wzElement == "repealed") {
            actObj.repealed = child.wzName;
        }
        else if (child.wzElement == "status") {
            actObj.status = child.wzName;
        }
        else {
            actObj['unknown_tag_' + child.wzElement] = child.wzName;
        }
    }
    if (!actObj.title) {
        actObj.title = {
            text: actObj.id
         };
    }
    resultObj.acts.push(actObj)
}
;
functors.agent = function(parent, resultObj, kind) {
    var agentObj = {
        id: parent.wzName, 
        kind: kind || 'agent', 
        ns: g_namespace, 
        contents: [
            
        ]
     };
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (!titleDateWikiContents(child, agentObj, resultObj)) {
        }
        else {
            agentObj['unknown_tag_' + child.wzElement] = child.wzName;
        }
    }
    if (!agentObj.title) {
        agentObj.title = {
            text: agentObj.id
         };
    }
    resultObj.agents.push(agentObj)
}
;
functors.king = function(parent, resultObj) {
    functors.person(parent, resultObj, 'king')
}
;
functors.pretender = function(parent, resultObj) {
    functors.person(parent, resultObj, 'pretender')
}
;
functors.minister = function(parent, resultObj) {
    functors.person(parent, resultObj, 'minister')
}
;
functors.person = function(parent, resultObj, kind) {
    var personObj = {
        id: parent.wzName, 
        kind: kind || 'person', 
        ns: g_namespace, 
        date: {
            start: '9999', 
            end: '0000'
         }, 
        memberships: [
            
        ], 
        works: [
            
        ], 
        contents: [
            
        ]
     };
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (!titleDateWikiContents(child, personObj, resultObj)) {
        }
        else if (child.wzElement == "born") {
            personObj.born = child.wzName;
        }
        else if (child.wzElement == "died") {
            personObj.died = child.wzName;
        }
        else if (child.wzElement == "house") {
            personObj.house = child.wzName;
        }
        else if (child.wzElement == "inCharge") {
            personObj.date = personObj.inCharge = createDate(child);
        }
        else if (child.wzElement == "regent") {
            personObj.date = personObj.regent = createDate(child);
        }
        else if (child.wzElement == "primeMinister") {
            setPersonWorkDate('prime-minister', child, personObj)
        }
        else if (child.wzElement == "foreignSecretary") {
            setPersonWorkDate('createDate-secretary', child, personObj)
        }
        else if (child.wzElement == "homeSecretary") {
            setPersonWorkDate('home-secretary', child, personObj)
        }
        else if (child.wzElement == "exchequer") {
            setPersonWorkDate('exchequer', child, personObj)
        }
        else if (child.wzElement == "party") {
            personObj.memberships.push({
                kind: 'party', 
                name: child.wzName, 
                date: createDate(child)
             })
        }
        else {
            personObj['unknown_tag_' + child.wzElement] = child.wzName;
        }
    }
    if (!personObj.title) {
        personObj.title = {
            text: personObj.id
         };
    }
    resultObj.persons.push(personObj)
}
;
function setPersonWorkDate(kind, node, personObj) {
    var workDate = createDate(node);
    personObj.works.push({
        kind: kind, 
        date: workDate
     })
    if (new Date(workDate.start) < new Date(personObj.date.start)) {
        personObj.date.start = workDate.start;
    }
    if (new Date(workDate.end) > new Date(personObj.date.end)) {
        personObj.date.end = workDate.end;
    }
}
functors.state = function(parent, resultObj, kind) {
    var stateObj = {
        id: parent.wzName, 
        kind: kind || 'state', 
        ns: g_namespace, 
        aliases: [
            
        ], 
        contents: [
            
        ]
     };
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (!titleDateWikiContents(child, stateObj, resultObj)) {
        }
        else if (child.wzElement == "alias") {
            stateObj.aliases.push({
                id: child.wzName
             })
        }
        else {
            stateObj['unknown_tag_' + child.wzElement] = child.wzName;
        }
    }
    resultObj.states.push(stateObj)
}
;
functors.namespace = function(parent, resultObj, kind) {
    const save_namespace = g_namespace;
    g_namespace = parent.wzName;
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        doitem(child, resultObj)
    }
    g_namespace = save_namespace;
}
;
function titleDateWikiContents(parent, currentObj, resultObj) {
    if (parent.wzElement == "title") {
        currentObj.title = createTitle(parent);
    }
    else if (parent.wzElement == "date" || parent.wzElement == "period") {
        currentObj.date = createDate(parent);
    }
    else if (parent.wzElement == "wiki") {
        currentObj.wiki = createWiki(parent, resultObj);
    }
    else if (!fillContents(parent, currentObj, resultObj)) {
    }
    else {
        return true;
    }
}
function createEvent(parent) {
    var eventObj = {};
    var i, i_items=parent.items, i_len=parent.items.length, item;
    for (i=0; i<i_len; i++) {
        item = parent.items[i];
        if (item.wzElement == "date") {
            eventObj.date = item.wzName;
        }
        else if (item.wzElement == "place") {
            eventObj.place = item.wzName;
        }
    }
    return eventObj;
}
function createTitle(parent) {
    var resultObj = {
        text: parent.wzName, 
        aliases: [
            
        ]
     };
    var i, i_items=parent.items, i_len=parent.items.length, item;
    for (i=0; i<i_len; i++) {
        item = parent.items[i];
        if (item.wzElement == "alias") {
            resultObj.aliases.push(createAlias(item))
        }
        else if (item.wzElement == "en") {
            resultObj.en = item.wzName;
        }
        else if (item.wzElement == "it") {
            resultObj.it = item.wzName;
        }
        else {
            resultObj['unknown_tag_' + item.wzElement] = item.wzName;
        }
    }
    return resultObj;
}
function createWiki(parent, resultObj) {
    var wikiObj = {
        url: parent.wzName, 
        contents: [
            
        ]
     };
    var i, i_items=parent.items, i_len=parent.items.length, item;
    for (i=0; i<i_len; i++) {
        item = parent.items[i];
        if (!fillContents(item, wikiObj, resultObj)) {
        }
        else {
            resultObj['unknown_tag_' + item.wzElement] = item.wzName;
        }
    }
    return wikiObj;
}
function createAlias(parent) {
    var resultObj = {
        content: parent.wzName
     };
    var i, i_items=parent.items, i_len=parent.items.length, item;
    for (i=0; i<i_len; i++) {
        item = parent.items[i];
        if (item.wzElement == "en") {
            resultObj.en = item.wzName;
        }
        else if (item.wzElement == "it") {
            resultObj.it = item.wzName;
        }
        else {
            resultObj['unknown_tag_' + item.wzElement] = item.wzName;
        }
    }
    return resultObj;
}
function createDate(parent) {
    var resultObj = {};
    if (parent.items.length == 0) {
        resultObj.start = parent.wzName;
    }
    else {
        var i, i_items=parent.items, i_len=parent.items.length, item;
        for (i=0; i<i_len; i++) {
            item = parent.items[i];
            if (item.wzElement == "start") {
                resultObj.start = item.wzName;
            }
            else if (item.wzElement == "end") {
                resultObj.end = item.wzName;
            }
            else {
                resultObj['unknown_tag_' + item.wzElement] = item.wzName;
            }
        }
    }
    return resultObj;
}
