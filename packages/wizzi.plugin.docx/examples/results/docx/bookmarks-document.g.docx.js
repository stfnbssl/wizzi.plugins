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
const docx_footer_5 = {};
docx_footer_5.children = [];
const docx_paragraph_6 = {};
docx_paragraph_6.children = [];
docx_paragraph_6.tabStops = [];
const docx_internalHyperlink_7 = {};
docx_internalHyperlink_7.anchor = "myAnchorId";
docx_internalHyperlink_7.children = [];
const docx_txt_8 = {};
docx_txt_8.text = "Click here!";
docx_txt_8.style = "Hyperlink";
const docx_txt_8Obj = new docx.TextRun(docx_txt_8);
docx_internalHyperlink_7.children.push(docx_txt_8Obj);
const docx_internalHyperlink_7Obj = new docx.InternalHyperlink(docx_internalHyperlink_7);
docx_paragraph_6.children.push(docx_internalHyperlink_7Obj);
const docx_paragraph_6Obj = new docx.Paragraph(docx_paragraph_6);
docx_footer_5.children.push(docx_paragraph_6Obj);
const docx_footer_5Obj = new docx.Footer(docx_footer_5);
docx_sect_2.footers.default = docx_footer_5Obj;
const docx_par_9 = { children: []};
docx_par_9.text = "";
docx_par_9.heading = docx.HeadingLevel.HEADING_1;
const docx_txt_10 = {};
docx_txt_10.text = "Lorem Ipsum no bookmark";
const docx_txt_10Obj = new docx.TextRun(docx_txt_10);
docx_par_9.children.push(docx_txt_10Obj);
const docx_par_9Obj = new docx.Paragraph(docx_par_9);
docx_sect_2.children.push(docx_par_9Obj);
const docx_par_11 = { children: []};
docx_par_11.text = "";
docx_par_11.heading = docx.HeadingLevel.HEADING_1;
const docx_bookmark_12 = {};
docx_bookmark_12.id = "myAnchorId";
docx_bookmark_12.children = [];
const docx_txt_13 = {};
docx_txt_13.text = "Lorem Ipsum bookmark";
const docx_txt_13Obj = new docx.TextRun(docx_txt_13);
docx_bookmark_12.children.push(docx_txt_13Obj);
const docx_bookmark_12Obj = new docx.Bookmark(docx_bookmark_12);
docx_par_11.children.push(docx_bookmark_12Obj);
const docx_par_11Obj = new docx.Paragraph(docx_par_11);
docx_sect_2.children.push(docx_par_11Obj);
const docx_paragraph_14 = {};
docx_paragraph_14.children = [];
docx_paragraph_14.tabStops = [];
docx_paragraph_14.text = "\n";
const docx_paragraph_14Obj = new docx.Paragraph(docx_paragraph_14);
docx_sect_2.children.push(docx_paragraph_14Obj);
const docx_paragraph_15 = {};
docx_paragraph_15.children = [];
docx_paragraph_15.tabStops = [];
docx_paragraph_15.text = "LOREM_IPSUM";
const docx_paragraph_15Obj = new docx.Paragraph(docx_paragraph_15);
docx_sect_2.children.push(docx_paragraph_15Obj);
const docx_paragraph_16 = {};
docx_paragraph_16.children = [];
docx_paragraph_16.tabStops = [];
const docx_pageBreak_17 = {};
const docx_pageBreak_17Obj = new docx.PageBreak(docx_pageBreak_17);
docx_paragraph_16.children.push(docx_pageBreak_17Obj);
const docx_paragraph_16Obj = new docx.Paragraph(docx_paragraph_16);
docx_sect_2.children.push(docx_paragraph_16Obj);
const docx_paragraph_18 = {};
docx_paragraph_18.children = [];
docx_paragraph_18.tabStops = [];
const docx_internalHyperlink_19 = {};
docx_internalHyperlink_19.anchor = "myAnchorId";
docx_internalHyperlink_19.children = [];
const docx_txt_20 = {};
docx_txt_20.text = "Styled";
docx_txt_20.bold = true;
docx_txt_20.style = "Hyperlink";
const docx_txt_20Obj = new docx.TextRun(docx_txt_20);
docx_internalHyperlink_19.children.push(docx_txt_20Obj);
const docx_txt_21 = {};
docx_txt_21.text = " Anchor Text";
docx_txt_21.style = "Hyperlink";
const docx_txt_21Obj = new docx.TextRun(docx_txt_21);
docx_internalHyperlink_19.children.push(docx_txt_21Obj);
const docx_internalHyperlink_19Obj = new docx.InternalHyperlink(docx_internalHyperlink_19);
docx_paragraph_18.children.push(docx_internalHyperlink_19Obj);
const docx_paragraph_18Obj = new docx.Paragraph(docx_paragraph_18);
docx_sect_2.children.push(docx_paragraph_18Obj);
const docx_paragraph_22 = {};
docx_paragraph_22.children = [];
docx_paragraph_22.tabStops = [];
const docx_txt_23 = {};
docx_txt_23.text = "The bookmark can be seen on page ";
const docx_txt_23Obj = new docx.TextRun(docx_txt_23);
docx_paragraph_22.children.push(docx_txt_23Obj);
const docx_pageReference_24 = {};
const docx_pageReference_24Obj = new docx.PageReference(docx_pageReference_24);
docx_paragraph_22.children.push(docx_pageReference_24Obj);
const docx_paragraph_22Obj = new docx.Paragraph(docx_paragraph_22);
docx_sect_2.children.push(docx_paragraph_22Obj);
docx_doc_1.sections.push(docx_sect_2)

const docx_MainObject = new docx.Document(docx_doc_1);

docx.Packer.toBuffer(docx_MainObject).then((buffer) => {
    fs.writeFileSync("bookmarks.docx", buffer);
    console.log("DONE written")
});