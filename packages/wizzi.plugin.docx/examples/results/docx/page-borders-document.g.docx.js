const fs = require("fs");
const docx = require("docx");
const convertInchesToTwip = docx.convertInchesToTwip;
const convertMillimetersToTwip = docx.convertMillimetersToTwip;

const docx_doc_1 = { sections: [], styles: [] };
const docx_sect_2 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_page_3 = {};
const docx_pageBorderBottom_4 = {};
docx_pageBorderBottom_4.style = docx.BorderStyle.SINGLE;
docx_pageBorderBottom_4.size = 201440;
docx_pageBorderBottom_4.color = "000000";
if (!docx_page_3.borders) { docx_page_3.borders = {} };
docx_page_3.borders.pageBorderBottom = docx_pageBorderBottom_4;
const docx_pageBorderLeft_5 = {};
docx_pageBorderLeft_5.style = docx.BorderStyle.SINGLE;
docx_pageBorderLeft_5.size = 201440;
docx_pageBorderLeft_5.color = "000000";
if (!docx_page_3.borders) { docx_page_3.borders = {} };
docx_page_3.borders.pageBorderLeft = docx_pageBorderLeft_5;
const docx_pageBorderRight_6 = {};
docx_pageBorderRight_6.style = docx.BorderStyle.SINGLE;
docx_pageBorderRight_6.size = 201440;
docx_pageBorderRight_6.color = "FF00AA";
if (!docx_page_3.borders) { docx_page_3.borders = {} };
docx_page_3.borders.pageBorderRight = docx_pageBorderRight_6;
const docx_pageBorderTop_7 = {};
docx_pageBorderTop_7.style = docx.BorderStyle.SINGLE;
docx_pageBorderTop_7.size = 201440;
docx_pageBorderTop_7.color = "000000";
if (!docx_page_3.borders) { docx_page_3.borders = {} };
docx_page_3.borders.pageBorderTop = docx_pageBorderTop_7;
const docx_pageBorders_8 = {};
docx_pageBorders_8.display = docx.PageBorderDisplay.ALL_PAGES;
docx_pageBorders_8.offsetFrom = docx.PageBorderOffsetFrom.TEXT;
docx_pageBorders_8.zOrder = docx.PageBorderZOrder.FRONT;
if (!docx_page_3.borders) { docx_page_3.borders = {} };
docx_page_3.borders.pageBorders = docx_pageBorders_8;
docx_sect_2.properties.page = docx_page_3;
const docx_par_9 = { children: []};
docx_par_9.text = "Hello World";
docx_par_9.heading = docx.HeadingLevel.HEADING_1;
const docx_par_9Obj = new docx.Paragraph(docx_par_9);
docx_sect_2.children.push(docx_par_9Obj);
const docx_p_10 = {};
docx_p_10.children = [];
docx_p_10.tabStops = [];
docx_p_10.text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const docx_p_10Obj = new docx.Paragraph(docx_p_10);
docx_sect_2.children.push(docx_p_10Obj);
const docx_p_11 = {};
docx_p_11.children = [];
docx_p_11.tabStops = [];
docx_p_11.text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const docx_p_11Obj = new docx.Paragraph(docx_p_11);
docx_sect_2.children.push(docx_p_11Obj);
docx_doc_1.sections.push(docx_sect_2)

const docx_MainObject = new docx.Document(docx_doc_1);

docx.Packer.toBuffer(docx_MainObject).then((buffer) => {
    fs.writeFileSync("page-borders.docx", buffer);
    console.log("DONE written")
});
