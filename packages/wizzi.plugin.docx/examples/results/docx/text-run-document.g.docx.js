const fs = require("fs");
const docx = require("docx");
const convertInchesToTwip = docx.convertInchesToTwip;
const convertMillimetersToTwip = docx.convertMillimetersToTwip;

const docx_doc_1 = { sections: [], styles: [] };
const docx_stylesDef_2 = {};
const docx_xdefault_3 = {};
const docx_styleDef_4 = {};
const docx_run_5 = {};
docx_run_5.size = 28;
docx_run_5.font = "Arial";
docx_styleDef_4.run = docx_run_5;
docx_xdefault_3.document = docx_styleDef_4;
docx_stylesDef_2.default = docx_xdefault_3;
docx_doc_1.styles = docx_stylesDef_2;
const docx_sect_6 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_page_7 = {};
const docx_margin_8 = {};
docx_margin_8.top = convertMillimetersToTwip(15);
docx_margin_8.right = convertMillimetersToTwip(15);
docx_margin_8.bottom = convertMillimetersToTwip(15);
docx_margin_8.left = convertMillimetersToTwip(15);
docx_page_7.margin = docx_margin_8;
docx_sect_6.properties.page = docx_page_7;
const docx_par_9 = { children: []};
docx_par_9.text = "Text runs";
docx_par_9.heading = docx.HeadingLevel.HEADING_1;
const docx_par_9Obj = new docx.Paragraph(docx_par_9);
docx_sect_6.children.push(docx_par_9Obj);
const docx_paragraph_10 = {};
docx_paragraph_10.children = [];
docx_paragraph_10.tabStops = [];
const docx_txt_11 = {};
docx_txt_11.text = "Foo Bar - bold";
docx_txt_11.bold = true;
const docx_txt_11Obj = new docx.TextRun(docx_txt_11);
docx_paragraph_10.children.push(docx_txt_11Obj);
const docx_paragraph_10Obj = new docx.Paragraph(docx_paragraph_10);
docx_sect_6.children.push(docx_paragraph_10Obj);
const docx_paragraph_12 = {};
docx_paragraph_12.children = [];
docx_paragraph_12.tabStops = [];
const docx_txt_13 = {};
docx_txt_13.text = "Foo Bar - italics";
docx_txt_13.bold = true;
const docx_txt_13Obj = new docx.TextRun(docx_txt_13);
docx_paragraph_12.children.push(docx_txt_13Obj);
const docx_paragraph_12Obj = new docx.Paragraph(docx_paragraph_12);
docx_sect_6.children.push(docx_paragraph_12Obj);
const docx_paragraph_14 = {};
docx_paragraph_14.children = [];
docx_paragraph_14.tabStops = [];
const docx_txt_15 = {};
docx_txt_15.text = "Foo Bar - underline DOUBLE color 990011";
const docx_underline_16 = {};
docx_underline_16.type = docx.UnderlineType.DOUBLE;
docx_underline_16.color = "990011";
docx_txt_15.underline = docx_underline_16;
const docx_txt_15Obj = new docx.TextRun(docx_txt_15);
docx_paragraph_14.children.push(docx_txt_15Obj);
const docx_paragraph_14Obj = new docx.Paragraph(docx_paragraph_14);
docx_sect_6.children.push(docx_paragraph_14Obj);
const docx_paragraph_17 = {};
docx_paragraph_17.children = [];
docx_paragraph_17.tabStops = [];
const docx_txt_18 = {};
docx_txt_18.text = "Foo Bar - emphasis mark";
docx_txt_18.emphasisMark = true;
const docx_txt_18Obj = new docx.TextRun(docx_txt_18);
docx_paragraph_17.children.push(docx_txt_18Obj);
const docx_paragraph_17Obj = new docx.Paragraph(docx_paragraph_17);
docx_sect_6.children.push(docx_paragraph_17Obj);
const docx_paragraph_19 = {};
docx_paragraph_19.children = [];
docx_paragraph_19.tabStops = [];
const docx_txt_20 = {};
docx_txt_20.text = "Foo Bar - shading REVERSE_DIAGONAL_STRIPE/00FFFF/FF0000";
const docx_shading_21 = {};
docx_shading_21.type = docx.ShadingType.REVERSE_DIAGONAL_STRIPE;
docx_shading_21.color = "00FFFF";
docx_shading_21.fill = "FF0000";
docx_txt_20.shading = docx_shading_21;
const docx_txt_20Obj = new docx.TextRun(docx_txt_20);
docx_paragraph_19.children.push(docx_txt_20Obj);
const docx_paragraph_19Obj = new docx.Paragraph(docx_paragraph_19);
docx_sect_6.children.push(docx_paragraph_19Obj);
const docx_paragraph_22 = {};
docx_paragraph_22.children = [];
docx_paragraph_22.tabStops = [];
const docx_txt_23 = {};
docx_txt_23.text = "Foo Bar - highlighting yellow";
docx_txt_23.highlight = "yellow";
const docx_txt_23Obj = new docx.TextRun(docx_txt_23);
docx_paragraph_22.children.push(docx_txt_23Obj);
const docx_paragraph_22Obj = new docx.Paragraph(docx_paragraph_22);
docx_sect_6.children.push(docx_paragraph_22Obj);
const docx_paragraph_24 = {};
docx_paragraph_24.children = [];
docx_paragraph_24.tabStops = [];
const docx_txt_25 = {};
docx_txt_25.text = "Foo Bar - strike through";
docx_txt_25.strike = true;
const docx_txt_25Obj = new docx.TextRun(docx_txt_25);
docx_paragraph_24.children.push(docx_txt_25Obj);
const docx_paragraph_24Obj = new docx.Paragraph(docx_paragraph_24);
docx_sect_6.children.push(docx_paragraph_24Obj);
const docx_paragraph_26 = {};
docx_paragraph_26.children = [];
docx_paragraph_26.tabStops = [];
const docx_txt_27 = {};
docx_txt_27.text = "Foo Bar - double strike through";
docx_txt_27.doubleStrike = true;
const docx_txt_27Obj = new docx.TextRun(docx_txt_27);
docx_paragraph_26.children.push(docx_txt_27Obj);
const docx_paragraph_26Obj = new docx.Paragraph(docx_paragraph_26);
docx_sect_6.children.push(docx_paragraph_26Obj);
const docx_paragraph_28 = {};
docx_paragraph_28.children = [];
docx_paragraph_28.tabStops = [];
const docx_txt_29 = {};
docx_txt_29.text = "Foo Bar - super script";
docx_txt_29.superScript = true;
const docx_txt_29Obj = new docx.TextRun(docx_txt_29);
docx_paragraph_28.children.push(docx_txt_29Obj);
const docx_paragraph_28Obj = new docx.Paragraph(docx_paragraph_28);
docx_sect_6.children.push(docx_paragraph_28Obj);
const docx_paragraph_30 = {};
docx_paragraph_30.children = [];
docx_paragraph_30.tabStops = [];
const docx_txt_31 = {};
docx_txt_31.text = "Foo Bar - sub script";
docx_txt_31.subScript = true;
const docx_txt_31Obj = new docx.TextRun(docx_txt_31);
docx_paragraph_30.children.push(docx_txt_31Obj);
const docx_paragraph_30Obj = new docx.Paragraph(docx_paragraph_30);
docx_sect_6.children.push(docx_paragraph_30Obj);
const docx_paragraph_32 = {};
docx_paragraph_32.children = [];
docx_paragraph_32.tabStops = [];
const docx_txt_33 = {};
docx_txt_33.text = "Foo Bar - all capitals";
docx_txt_33.allCaps = true;
const docx_txt_33Obj = new docx.TextRun(docx_txt_33);
docx_paragraph_32.children.push(docx_txt_33Obj);
const docx_paragraph_32Obj = new docx.Paragraph(docx_paragraph_32);
docx_sect_6.children.push(docx_paragraph_32Obj);
const docx_paragraph_34 = {};
docx_paragraph_34.children = [];
docx_paragraph_34.tabStops = [];
const docx_txt_35 = {};
docx_txt_35.text = "Foo Bar - small capitals";
docx_txt_35.smallCaps = true;
const docx_txt_35Obj = new docx.TextRun(docx_txt_35);
docx_paragraph_34.children.push(docx_txt_35Obj);
const docx_paragraph_34Obj = new docx.Paragraph(docx_paragraph_34);
docx_sect_6.children.push(docx_paragraph_34Obj);
const docx_paragraph_36 = {};
docx_paragraph_36.children = [];
docx_paragraph_36.tabStops = [];
const docx_txt_37 = {};
docx_txt_37.text = "Foo Bar - vanish - This text will be hidden";
docx_txt_37.vanish = true;
const docx_txt_37Obj = new docx.TextRun(docx_txt_37);
docx_paragraph_36.children.push(docx_txt_37Obj);
const docx_paragraph_36Obj = new docx.Paragraph(docx_paragraph_36);
docx_sect_6.children.push(docx_paragraph_36Obj);
const docx_paragraph_38 = {};
docx_paragraph_38.children = [];
docx_paragraph_38.tabStops = [];
const docx_txt_39 = {};
docx_txt_39.text = "Foo Bar - specVanish - This text will be hidden forever";
docx_txt_39.specVanish = true;
const docx_txt_39Obj = new docx.TextRun(docx_txt_39);
docx_paragraph_38.children.push(docx_txt_39Obj);
const docx_paragraph_38Obj = new docx.Paragraph(docx_paragraph_38);
docx_sect_6.children.push(docx_paragraph_38Obj);
const docx_paragraph_40 = {};
docx_paragraph_40.children = [];
docx_paragraph_40.tabStops = [];
const docx_txt_41 = {};
docx_txt_41.text = "Foo Bar - break";
docx_txt_41.break = true;
const docx_txt_41Obj = new docx.TextRun(docx_txt_41);
docx_paragraph_40.children.push(docx_txt_41Obj);
const docx_paragraph_40Obj = new docx.Paragraph(docx_paragraph_40);
docx_sect_6.children.push(docx_paragraph_40Obj);
const docx_paragraph_42 = {};
docx_paragraph_42.children = [];
docx_paragraph_42.tabStops = [];
const docx_txt_43 = {};
docx_txt_43.text = "Foo Bar - break 2";
docx_txt_43.break = true;
const docx_txt_43Obj = new docx.TextRun(docx_txt_43);
docx_paragraph_42.children.push(docx_txt_43Obj);
const docx_paragraph_42Obj = new docx.Paragraph(docx_paragraph_42);
docx_sect_6.children.push(docx_paragraph_42Obj);
docx_doc_1.sections.push(docx_sect_6)

const docx_MainObject = new docx.Document(docx_doc_1);

docx.Packer.toBuffer(docx_MainObject).then((buffer) => {
    fs.writeFileSync("text-runs.docx", buffer);
    console.log("DONE written")
});