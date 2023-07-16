const fs = require("fs");
const docx = require("docx");
const convertInchesToTwip = docx.convertInchesToTwip;
const convertMillimetersToTwip = docx.convertMillimetersToTwip;

const docx_doc_1 = { sections: [], styles: [] };
const docx_sect_2 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_page_3 = {};
if (!docx_page_3.size) { docx_page_3.size = {} };
docx_page_3.size.orientation = docx.PageOrientation.LANDSCAPE;
if (!docx_page_3.size) { docx_page_3.size = {} };
docx_page_3.size.width = convertMillimetersToTwip(148);
if (!docx_page_3.size) { docx_page_3.size = {} };
docx_page_3.size.height = convertMillimetersToTwip(210);
docx_sect_2.properties.page = docx_page_3;
const docx_p_4 = {};
docx_p_4.children = [];
docx_p_4.tabStops = [];
docx_p_4.text = "Hello World";
const docx_p_4Obj = new docx.Paragraph(docx_p_4);
docx_sect_2.children.push(docx_p_4Obj);
docx_doc_1.sections.push(docx_sect_2)
const docx_sect_5 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_page_6 = {};
if (!docx_page_6.size) { docx_page_6.size = {} };
docx_page_6.size.orientation = docx.PageOrientation.PORTRAIT;
if (!docx_page_6.size) { docx_page_6.size = {} };
docx_page_6.size.width = convertMillimetersToTwip(297);
if (!docx_page_6.size) { docx_page_6.size = {} };
docx_page_6.size.height = convertMillimetersToTwip(420);
docx_sect_5.properties.page = docx_page_6;
const docx_p_7 = {};
docx_p_7.children = [];
docx_p_7.tabStops = [];
docx_p_7.text = "Hello World";
const docx_p_7Obj = new docx.Paragraph(docx_p_7);
docx_sect_5.children.push(docx_p_7Obj);
docx_doc_1.sections.push(docx_sect_5)

const docx_MainObject = new docx.Document(docx_doc_1);

docx.Packer.toBuffer(docx_MainObject).then((buffer) => {
    fs.writeFileSync("page-sizes.docx", buffer);
    console.log("DONE written")
});
