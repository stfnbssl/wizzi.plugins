const fs = require("fs");
const docx = require("docx");
const convertInchesToTwip = docx.convertInchesToTwip;
const convertMillimetersToTwip = docx.convertMillimetersToTwip;

const docx_doc_1 = { sections: [], styles: [] };
const docx_stylesDef_2 = {};
const docx_characterStyles_3 = [];
const docx_styleDef_4 = {};
docx_styleDef_4.id = "myRedStyle";
docx_styleDef_4.name = "My Wonky Style";
docx_styleDef_4.basedOn = "Normal";
const docx_run_5 = {};
docx_run_5.color = "990000";
docx_run_5.italics = true;
docx_styleDef_4.run = docx_run_5;
docx_characterStyles_3.push(docx_styleDef_4);
const docx_styleDef_6 = {};
docx_styleDef_6.id = "strong";
docx_styleDef_6.name = "Strong";
docx_styleDef_6.basedOn = "Normal";
const docx_run_7 = {};
docx_run_7.bold = true;
docx_styleDef_6.run = docx_run_7;
docx_characterStyles_3.push(docx_styleDef_6);
docx_stylesDef_2.characterStyles = docx_characterStyles_3;
docx_doc_1.styles = docx_stylesDef_2;
const docx_sect_8 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_page_9 = {};
const docx_margin_10 = {};
docx_margin_10.top = convertInchesToTwip(1.2);
docx_margin_10.right = convertInchesToTwip(1.2);
docx_margin_10.bottom = convertInchesToTwip(1.2);
docx_margin_10.left = convertInchesToTwip(1.2);
docx_page_9.margin = docx_margin_10;
docx_sect_8.properties.page = docx_page_9;
const docx_par_11 = { children: []};
docx_par_11.text = "Character styles";
docx_par_11.heading = docx.HeadingLevel.HEADING_1;
const docx_par_11Obj = new docx.Paragraph(docx_par_11);
docx_sect_8.children.push(docx_par_11Obj);
const docx_paragraph_12 = {};
docx_paragraph_12.children = [];
docx_paragraph_12.tabStops = [];
const docx_txt_13 = {};
docx_txt_13.text = "Foo bar";
docx_txt_13.style = "myRedStyle";
const docx_txt_13Obj = new docx.TextRun(docx_txt_13);
docx_paragraph_12.children.push(docx_txt_13Obj);
const docx_paragraph_12Obj = new docx.Paragraph(docx_paragraph_12);
docx_sect_8.children.push(docx_paragraph_12Obj);
const docx_paragraph_14 = {};
docx_paragraph_14.children = [];
docx_paragraph_14.tabStops = [];
const docx_txt_15 = {};
docx_txt_15.text = "First Word";
docx_txt_15.style = "strong";
const docx_txt_15Obj = new docx.TextRun(docx_txt_15);
docx_paragraph_14.children.push(docx_txt_15Obj);
const docx_txt_16 = {};
docx_txt_16.text = " - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const docx_txt_16Obj = new docx.TextRun(docx_txt_16);
docx_paragraph_14.children.push(docx_txt_16Obj);
const docx_paragraph_14Obj = new docx.Paragraph(docx_paragraph_14);
docx_sect_8.children.push(docx_paragraph_14Obj);
docx_doc_1.sections.push(docx_sect_8)

const docx_MainObject = new docx.Document(docx_doc_1);

docx.Packer.toBuffer(docx_MainObject).then((buffer) => {
    fs.writeFileSync("character-styles.docx", buffer);
    console.log("DONE written")
});