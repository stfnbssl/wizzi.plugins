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
const docx_table_5 = {};
docx_table_5.rows = [];
docx_table_5.columnWidths = [72 * 20 * 4, 72 * 20 * 4];
const docx_width_6 = {};
docx_width_6.size = 72 * 20 * 8;
docx_width_6.type = docx.WidthType.DXA;
docx_table_5.width = docx_width_6;
const docx_tr_7 = {};
docx_tr_7.children = [];
const docx_td_8 = {};
docx_td_8.children = [];
const docx_paragraph_9 = {};
docx_paragraph_9.children = [];
docx_paragraph_9.tabStops = [];
docx_paragraph_9.text = "Left cell";
const docx_paragraph_9Obj = new docx.Paragraph(docx_paragraph_9);
docx_td_8.children.push(docx_paragraph_9Obj);
docx_td_8.verticalAlign = docx.VerticalAlign.CENTER;
const docx_width_10 = {};
docx_width_10.size = 72 * 20 * 4;
docx_width_10.type = docx.WidthType.DXA;
docx_td_8.width = docx_width_10;
const docx_td_8Obj = new docx.TableCell(docx_td_8);
docx_tr_7.children.push(docx_td_8Obj);
const docx_td_11 = {};
docx_td_11.children = [];
const docx_paragraph_12 = {};
docx_paragraph_12.children = [];
docx_paragraph_12.tabStops = [];
docx_paragraph_12.text = "Right cell";
const docx_paragraph_12Obj = new docx.Paragraph(docx_paragraph_12);
docx_td_11.children.push(docx_paragraph_12Obj);
docx_td_11.verticalAlign = docx.VerticalAlign.CENTER;
const docx_width_13 = {};
docx_width_13.size = 72 * 20 * 4;
docx_width_13.type = docx.WidthType.DXA;
docx_td_11.width = docx_width_13;
const docx_td_11Obj = new docx.TableCell(docx_td_11);
docx_tr_7.children.push(docx_td_11Obj);
const docx_tr_7Obj = new docx.TableRow(docx_tr_7);
docx_table_5.rows.push(docx_tr_7Obj);
const docx_table_5Obj = new docx.Table(docx_table_5);
docx_sect_2.children.push(docx_table_5Obj);
docx_doc_1.sections.push(docx_sect_2)

const docx_MainObject = new docx.Document(docx_doc_1);

docx.Packer.toBuffer(docx_MainObject).then((buffer) => {
    fs.writeFileSync("table.docx", buffer);
    console.log("DONE written")
});
