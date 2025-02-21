const fs = require("fs");
const docx = require("docx");
const convertInchesToTwip = docx.convertInchesToTwip;
const convertMillimetersToTwip = docx.convertMillimetersToTwip;

const docx_doc_1 = { sections: [], styles: [] };
const tabStops_receiptTabStops = [];
const docx_tabStopDef_2 = {};
docx_tabStopDef_2.type = docx.TabStopType.RIGHT;
docx_tabStopDef_2.position = (docx.TabStopPosition.MAX / 4) *2;
tabStops_receiptTabStops.push(docx_tabStopDef_2);
const docx_tabStopDef_3 = {};
docx_tabStopDef_3.type = docx.TabStopType.RIGHT;
docx_tabStopDef_3.position = (docx.TabStopPosition.MAX / 4) *3;
tabStops_receiptTabStops.push(docx_tabStopDef_3);
const docx_tabStopDef_4 = {};
docx_tabStopDef_4.type = docx.TabStopType.RIGHT;
docx_tabStopDef_4.position = (docx.TabStopPosition.MAX / 4) *3;
tabStops_receiptTabStops.push(docx_tabStopDef_4);
const docx_tabStopDef_5 = {};
docx_tabStopDef_5.type = docx.TabStopType.RIGHT;
docx_tabStopDef_5.position = docx.TabStopPosition.MAX;
tabStops_receiptTabStops.push(docx_tabStopDef_5);
const tabStops_twoTabStops = [];
const docx_tabStopDef_6 = {};
docx_tabStopDef_6.type = docx.TabStopType.RIGHT;
docx_tabStopDef_6.position = docx.TabStopPosition.MAX;
tabStops_twoTabStops.push(docx_tabStopDef_6);
const docx_sect_7 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_par_8 = { children: []};
docx_par_8.text = "";
docx_par_8.heading = docx.HeadingLevel.HEADING_1;
const docx_txt_9 = {};
docx_txt_9.text = "Receipt 001";
const docx_txt_9Obj = new docx.TextRun(docx_txt_9);
docx_par_8.children.push(docx_txt_9Obj);
const docx_par_8Obj = new docx.Paragraph(docx_par_8);
docx_sect_7.children.push(docx_par_8Obj);
const docx_p_10 = {};
docx_p_10.children = [];
docx_p_10.tabStops = [];
docx_p_10.tabStops = tabStops_twoTabStops;
const docx_txt_11 = {};
docx_txt_11.text = "To Bob.\tBy Alice.";
docx_txt_11.bold = true;
const docx_txt_11Obj = new docx.TextRun(docx_txt_11);
docx_p_10.children.push(docx_txt_11Obj);
const docx_p_10Obj = new docx.Paragraph(docx_p_10);
docx_sect_7.children.push(docx_p_10Obj);
const docx_p_12 = {};
docx_p_12.children = [];
docx_p_12.tabStops = [];
docx_p_12.tabStops = tabStops_twoTabStops;
const docx_txt_13 = {};
docx_txt_13.text = "Foo Inc\tBar Inc";
docx_txt_13.bold = true;
const docx_txt_13Obj = new docx.TextRun(docx_txt_13);
docx_p_12.children.push(docx_txt_13Obj);
const docx_p_12Obj = new docx.Paragraph(docx_p_12);
docx_sect_7.children.push(docx_p_12Obj);
const docx_p_14 = {};
docx_p_14.children = [];
docx_p_14.tabStops = [];
docx_p_14.tabStops = tabStops_receiptTabStops;
const docx_txt_15 = {};
docx_txt_15.text = "Item\tPrice\tQuantity\tSub-total";
docx_txt_15.bold = true;
const docx_txt_15Obj = new docx.TextRun(docx_txt_15);
docx_p_14.children.push(docx_txt_15Obj);
const docx_p_14Obj = new docx.Paragraph(docx_p_14);
docx_sect_7.children.push(docx_p_14Obj);
const docx_p_16 = {};
docx_p_16.children = [];
docx_p_16.tabStops = [];
const docx_p_16Obj = new docx.Paragraph(docx_p_16);
docx_sect_7.children.push(docx_p_16Obj);
const docx_p_17 = {};
docx_p_17.children = [];
docx_p_17.tabStops = [];
docx_p_17.tabStops = tabStops_receiptTabStops;
const docx_txt_18 = {};
docx_txt_18.text = "Item 3\t10\t5\t50";
const docx_txt_18Obj = new docx.TextRun(docx_txt_18);
docx_p_17.children.push(docx_txt_18Obj);
const docx_p_17Obj = new docx.Paragraph(docx_p_17);
docx_sect_7.children.push(docx_p_17Obj);
const docx_p_19 = {};
docx_p_19.children = [];
docx_p_19.tabStops = [];
docx_p_19.tabStops = tabStops_receiptTabStops;
const docx_txt_20 = {};
docx_txt_20.text = "Item 3\t10\t5\t50";
const docx_txt_20Obj = new docx.TextRun(docx_txt_20);
docx_p_19.children.push(docx_txt_20Obj);
const docx_p_19Obj = new docx.Paragraph(docx_p_19);
docx_sect_7.children.push(docx_p_19Obj);
const docx_p_21 = {};
docx_p_21.children = [];
docx_p_21.tabStops = [];
docx_p_21.tabStops = tabStops_receiptTabStops;
const docx_txt_22 = {};
docx_txt_22.text = "\t\t\tTotal: 200";
docx_txt_22.bold = true;
const docx_txt_22Obj = new docx.TextRun(docx_txt_22);
docx_p_21.children.push(docx_txt_22Obj);
const docx_p_21Obj = new docx.Paragraph(docx_p_21);
docx_sect_7.children.push(docx_p_21Obj);
docx_doc_1.sections.push(docx_sect_7)

const docx_MainObject = new docx.Document(docx_doc_1);

docx.Packer.toBuffer(docx_MainObject).then((buffer) => {
    fs.writeFileSync("tab-stops.docx", buffer);
    console.log("DONE written")
});
