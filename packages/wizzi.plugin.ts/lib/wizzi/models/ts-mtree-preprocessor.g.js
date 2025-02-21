/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\wizzi\models\ts-mtree-preprocessor.g.js.ittf
    utc time: Tue, 07 Jan 2025 04:22:48 GMT
*/
// Those of facebook react
// The 'p' tag works both as a html tag and a class property
// TODO the 'param' tag/element (children of object element) has been suspended for
// collision with input check param.
// Reintroduce as @param.
// TODO the 'filter' tag/element has been suspended for collision with array filter
// Reintroduce as @filter.
// TODO the 'var' tag/element has been suspended for collision with variable
// Reintroduce as @var
// TODO the 'set' tag/element has been suspended for collision with set statement
// Reintroduce as @set
// TODO the 'switch' tag/element has been suspended for collision with switch statement
// Reintroduce as @switch
// TODO the 'base' tag/element has been suspended for collision with base statement
// Reintroduce as @base
// TODO the 'form' attribute has been suspended for collision with tag/element
// Reintroduce as @form
// TODO the 'label' attribute has been suspended for collision with tag/element
// Reintroduce as @label
// TODO the 'span' attribute has been suspended for collision with tag/element
// Reintroduce as @span
// TODO the 'summary' attribute has been suspended for collision with tag/element
// Reintroduce as @summary
var _tags = "a abbr address area article aside audio b @base bdi bdo big blockquote body br" + " button canvas caption cite code col colgroup data datalist dd del details dfn" + " dialog div dl dt em embed fieldset figcaption figure @filter footer form h1 h2 h3 h4 h5" + " h6 head header hr html i iframe img input ins kbd keygen label legend li link" + " main map mark menu menuitem meta meter nav noscript object ol optgroup option" + " output picture pre progress q rp rt ruby s samp script section select" + " small source span strong @style sub summary sup table tbody td textarea tfoot th" + " thead time @title tr track u ul video wbr" + " altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion animateTransform" + " circle clipPath color-profile cursor defs desc discard ellipse" + " font font-face font-face-format font-face-name font-face-src font-face-uri" + " foreignObject g glyph glyphRef hatch hatchpath hkern image line linearGradient" + " marker mask metadata missing-glyph mpath p @param path pattern polygon polyline radialGradient" + " rect @set solidcolor stop svg @switch symbol text textPath tref tspan" + " unknown use @var view vkern";
var html_supported_tags = _tags.split(' ');
var _attrs = "accept acceptCharset accessKey action allowFullScreen allowTransparency alt" + " async autoComplete autoFocus autoPlay capture cellPadding cellSpacing charSet" + " challenge checked classID className cols colSpan content contentEditable contextMenu" + " controls coords crossOrigin data dateTime defer dir disabled download draggable" + " encType @form formAction formEncType formMethod formNoValidate formTarget frameBorder" + " headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode" + " keyParams keyType @label lang list loop low manifest marginHeight marginWidth max" + " maxLength media mediaGroup method min minLength multiple muted name noValidate open" + " optimum pattern placeholder poster preload radioGroup readOnly rel required role" + " rows rowSpan sandbox scope scoped scrolling seamless selected shape size sizes" + " @span spellCheck src srcDoc srcSet start step style @summary tabIndex target title" + " type useMap value width wmode wrap" + " static";
var html_supported_attrs = _attrs.split(' ');
var _svg_attrs = "accentHeight accumulate additive alignmentBaseline allowReorder alphabetic" + " amplitude arabicForm ascent attributeName attributeType autoReverse azimuth" + " baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight" + " clip clipPath clipPathUnits clipRule colorInterpolation" + " colorInterpolationFilters colorProfile colorRendering contentScriptType" + " contentStyleType cursor cx cy d decelerate descent diffuseConstant direction" + " display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground" + " end exponent externalResourcesRequired fill fillOpacity fillRule @filter" + " filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize" + " fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy" + " g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef "+ " gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic" + " imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength" + " kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor" + " limitingConeAngle local markerEnd markerHeight markerMid markerStart" + " markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode" + " numOctaves offset opacity operator order orient orientation origin overflow" + " overlinePosition overlineThickness paintOrder panose1 pathLength" + " patternContentUnits patternTransform patternUnits pointerEvents points" + " pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits" + " r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions" + " requiredFeatures restart result rotate rx ry scale seed shapeRendering slope" + " spacing specularConstant specularExponent speed spreadMethod startOffset" + " stdDeviation stemh stemv stitchTiles stopColor stopOpacity" + " strikethroughPosition strikethroughThickness string stroke strokeDasharray" + " strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity" + " strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor" + " textDecoration textLength textRendering to transform u1 u2 underlinePosition" + " underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic" + " vHanging vIdeographic vMathematical values vectorEffect version vertAdvY" + " vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing" + " writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole" + " xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase" + " xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan";
var svg_supported_attrs = _svg_attrs.split(' ');
var temp = [], s;
var svg_supported_attrs_map = {};
var i, i_items=svg_supported_attrs, i_len=svg_supported_attrs.length, a;
for (i=0; i<i_len; i++) {
    a = svg_supported_attrs[i];
    s = a.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    if (a !== s) {
        temp.push(s);
        svg_supported_attrs_map[s] = a;
    }
}
svg_supported_attrs = svg_supported_attrs.concat(temp);
module.exports = function(mTree, context) {
    // loog 'preprocess.mTree', mTree
    var state = {
        svgOn: false, 
        htmlOn: false, 
        styledOn: false
     };
    var i, i_items=mTree.nodes[0].children, i_len=mTree.nodes[0].children.length, item;
    for (i=0; i<i_len; i++) {
        item = mTree.nodes[0].children[i];
        traverse(item, state);
    }
    return mTree;
}
;
function traverse(node, state) {
    if (preprocessNode(node, state)) {
        return ;
    }
    var saveHtmlOn = state.htmlOn;
    var saveSvgOn = state.svgOn;
    var savestyledOn = state.styledOn;
    var saveParent = state.parent;
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        state.parent = node;
        traverse(item, state);
    }
    state.htmlOn = saveHtmlOn;
    state.svgOn = saveSvgOn;
    state.styledOn = savestyledOn;
    state.parent = saveParent;
}
function preprocessNode(node, state) {
    
    // do nothing
    if (state.parent && (node.n === 'p' && state.parent.n === 'class')) {
    }
    else if (state.svgOn && svg_supported_attrs.indexOf(node.n) > -1) {
        var name = svg_supported_attrs_map[node.n] || node.n;
        node.v = name + ' ' + node.v;
        node.n = '@';
    }
    else if (state.htmlOn && html_supported_attrs.indexOf(node.n) > -1) {
        node.v = node.n + ' ' + node.v;
        node.n = '@';
    }
    else if (html_supported_tags.indexOf(node.n) > -1) {
        var tag = node.n;
        if (node.n[0] === '@') {
            tag = node.n.substr(1);
        }
        node.v = tag + ' ' + node.v;
        node.n = '<';
        state.htmlOn = true;
        if (node.n === 'svg') {
            state.svgOn = true;
        }
    }
    else if (node.n === '<') {
        state.htmlOn = true;
        if (node.v === 'svg') {
            state.svgOn = true;
        }
    }
    else if (node.n === 'svg') {
        state.htmlOn = true;
        state.svgOn = true;
    }
    
    // loog 'node', node
    else if (node.n === 'if' && state.styledOn) {
        var nCssStyled = createNode(node, '<', '--styled--', node.children);
        var nCss = createNode(node, 'css', null, [nCssStyled]);
        var nJsStyled = createNode(node, 'styled', null, [nCss]);
        var nJsIf = createNode(node, node.n, node.v, [nJsStyled]);
        var nJsModule = createNode(node, 'module', null, [nJsIf]);
        node.n = 'js=>';
        node.v = null;
        node.children = [nJsModule];
        return true;
    }
    else if (node.n === 'styled' || node.n === 'keyframes' || node.n === 'styled-css' || (node.n === 'css' && state.styledOn)) {
        if (node.children.length == 1 && node.children[0].n == "css") {
            return false;
        }
        var arrow;
        var savedchildren = [];
        var i, i_items=node.children, i_len=node.children.length, child;
        for (i=0; i<i_len; i++) {
            child = node.children[i];
            if (child.n == '=>') {
                arrow = child;
            }
            else {
                savedchildren.push(child)
            }
        }
        var cssnode = {
            n: "css", 
            v: "", 
            r: node.r, 
            c: node.c, 
            s: node.s, 
            u: node.u, 
            children: [
                {
                    n: (node.n === 'keyframes' ? "keyframes" : "<"), 
                    v: "--styled--", 
                    r: node.r, 
                    c: node.c, 
                    s: node.s, 
                    u: node.u, 
                    children: savedchildren
                 }
            ]
         };
        if (node.n == 'css') {
            node.n == 'styled-css';
        }
        node.children = arrow ? [arrow, cssnode] : [cssnode];
        state.styledOn = true;
        var i, i_items=savedchildren, i_len=savedchildren.length, child;
        for (i=0; i<i_len; i++) {
            child = savedchildren[i];
            traverse(child, state)
        }
        state.styledOn = false;
        return true;
    }
    return false;
}
function createNode(node, name, value, childrenFrom) {
    return {
            n: name, 
            v: value, 
            r: node.r, 
            c: node.c, 
            s: node.s, 
            u: node.u, 
            children: childrenFrom || []
         };
}