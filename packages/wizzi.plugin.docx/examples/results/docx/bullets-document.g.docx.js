const fs = require("fs");
const docx = require("docx");
const convertInchesToTwip = docx.convertInchesToTwip;
const convertMillimetersToTwip = docx.convertMillimetersToTwip;

const docx_doc_1 = { sections: [], styles: [] };
const docx_sect_2 = { properties: {}, children: [] };
const docx_li_3 = {};
docx_li_3.children = [];
docx_li_3.tabStops = [];
docx_li_3.bullet = { level: 0};
const docx_txt_4 = {};
docx_txt_4.text = "Bullet points";
const docx_txt_4Obj = new docx.TextRun(docx_txt_4);
docx_li_3.children.push(docx_txt_4Obj);
const docx_li_5 = {};
docx_li_5.children = [];
docx_li_5.tabStops = [];
docx_li_5.bullet = { level: 1};
const docx_txt_6 = {};
docx_txt_6.text = "we are going deep";
const docx_txt_6Obj = new docx.TextRun(docx_txt_6);
docx_li_5.children.push(docx_txt_6Obj);
const docx_li_5Obj = new docx.Paragraph(docx_li_5);
docx_li_3.children.push(docx_li_5Obj);
const docx_li_7 = {};
docx_li_7.children = [];
docx_li_7.tabStops = [];
docx_li_7.bullet = { level: 1};
const docx_txt_8 = {};
docx_txt_8.text = "at level 2";
const docx_txt_8Obj = new docx.TextRun(docx_txt_8);
docx_li_7.children.push(docx_txt_8Obj);
const docx_li_7Obj = new docx.Paragraph(docx_li_7);
docx_li_3.children.push(docx_li_7Obj);
const docx_li_3Obj = new docx.Paragraph(docx_li_3);
docx_sect_2.children.push(docx_li_3Obj);
const docx_li_9 = {};
docx_li_9.children = [];
docx_li_9.tabStops = [];
docx_li_9.bullet = { level: 0};
const docx_txt_10 = {};
docx_txt_10.text = "Are awesome";
const docx_txt_10Obj = new docx.TextRun(docx_txt_10);
docx_li_9.children.push(docx_txt_10Obj);
const docx_li_9Obj = new docx.Paragraph(docx_li_9);
docx_sect_2.children.push(docx_li_9Obj);
docx_doc_1.sections.push(docx_sect_2)

const docx_MainObject = new docx.Document(docx_doc_1);

docx.Packer.toBuffer(docx_MainObject).then((buffer) => {
    fs.writeFileSync("bullets.docx", buffer);
    console.log("DONE written")
});
