const fs = require("fs");
const docx = require("docx");
const convertInchesToTwip = docx.convertInchesToTwip;
const convertMillimetersToTwip = docx.convertMillimetersToTwip;

const docx_doc_1 = { sections: [], styles: [] };
const docx_sect_2 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_page_3 = {};
const docx_margin_4 = {};
docx_margin_4.top = convertInchesToTwip(1.0);
docx_margin_4.right = convertInchesToTwip(1.0);
docx_margin_4.bottom = convertInchesToTwip(1.0);
docx_margin_4.left = convertInchesToTwip(1.0);
docx_page_3.margin = docx_margin_4;
docx_sect_2.properties.page = docx_page_3;
const docx_par_5 = { children: []};
docx_par_5.text = "Hello World";
docx_par_5.heading = docx.HeadingLevel.HEADING_1;
const docx_par_5Obj = new docx.Paragraph(docx_par_5);
docx_sect_2.children.push(docx_par_5Obj);
const docx_paragraph_6 = {};
docx_paragraph_6.children = [];
docx_paragraph_6.tabStops = [];
docx_paragraph_6.text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const docx_paragraph_6Obj = new docx.Paragraph(docx_paragraph_6);
docx_sect_2.children.push(docx_paragraph_6Obj);
const docx_paragraph_7 = {};
docx_paragraph_7.children = [];
docx_paragraph_7.tabStops = [];
docx_paragraph_7.text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const docx_paragraph_7Obj = new docx.Paragraph(docx_paragraph_7);
docx_sect_2.children.push(docx_paragraph_7Obj);
docx_doc_1.sections.push(docx_sect_2)

const docx_MainObject = new docx.Document(docx_doc_1);

docx.Packer.toBuffer(docx_MainObject).then((buffer) => {
    fs.writeFileSync("page-margins.docx", buffer);
    console.log("DONE written")
});
