const fs = require("fs");
const docx = require("docx");
const convertInchesToTwip = docx.convertInchesToTwip;
const convertMillimetersToTwip = docx.convertMillimetersToTwip;

const docx_doc_1 = { sections: [], styles: [] };
const docx_sect_2 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_page_3 = {};
const docx_margin_4 = {};
docx_margin_4.top = convertInchesToTwip(1.2);
docx_margin_4.right = convertInchesToTwip(1.2);
docx_margin_4.bottom = convertInchesToTwip(1.2);
docx_margin_4.left = convertInchesToTwip(1.2);
docx_page_3.margin = docx_margin_4;
docx_sect_2.properties.page = docx_page_3;
const docx_par_5 = { children: []};
docx_par_5.text = "Paragraph spacing";
docx_par_5.heading = docx.HeadingLevel.HEADING_1;
const docx_par_5Obj = new docx.Paragraph(docx_par_5);
docx_sect_2.children.push(docx_par_5Obj);
const docx_paragraph_6 = {};
docx_paragraph_6.children = [];
docx_paragraph_6.tabStops = [];
const docx_spacing_7 = {};
docx_spacing_7.before = 5000;
docx_spacing_7.before = 5000;
docx_paragraph_6.spacing = docx_spacing_7;
const docx_txt_8 = {};
docx_txt_8.text = "Hello World";
const docx_txt_8Obj = new docx.TextRun(docx_txt_8);
docx_paragraph_6.children.push(docx_txt_8Obj);
const docx_paragraph_6Obj = new docx.Paragraph(docx_paragraph_6);
docx_sect_2.children.push(docx_paragraph_6Obj);
const docx_paragraph_9 = {};
docx_paragraph_9.children = [];
docx_paragraph_9.tabStops = [];
const docx_spacing_10 = {};
docx_spacing_10.line = 2000;
docx_spacing_10.lineRule = docx.LineRuleType.AUTO;
docx_paragraph_9.spacing = docx_spacing_10;
const docx_txt_11 = {};
docx_txt_11.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed turpis ex, aliquet et faucibus quis, euismod in odio. Fusce gravida tempor nunc sed lacinia. Nulla sed dolor fringilla, fermentum libero ut, egestas ex. Donec pellentesque metus non orci lacinia bibendum. Cras porta ex et mollis hendrerit. Suspendisse id lectus suscipit, elementum lacus eu, convallis felis. Fusce sed bibendum dolor, id posuere ligula. Aliquam eu elit ut urna eleifend vestibulum. Praesent condimentum at turpis sed scelerisque. Suspendisse porttitor metus nec vestibulum egestas. Sed in eros sapien. Morbi efficitur placerat est a consequat. Nunc bibendum porttitor mi nec tempus. Morbi dictum augue porttitor nisi sodales sodales.";
const docx_txt_11Obj = new docx.TextRun(docx_txt_11);
docx_paragraph_9.children.push(docx_txt_11Obj);
const docx_paragraph_9Obj = new docx.Paragraph(docx_paragraph_9);
docx_sect_2.children.push(docx_paragraph_9Obj);
docx_doc_1.sections.push(docx_sect_2)

const docx_MainObject = new docx.Document(docx_doc_1);

docx.Packer.toBuffer(docx_MainObject).then((buffer) => {
    fs.writeFileSync("paragraph-spacing.docx", buffer);
    console.log("DONE written")
});
