const fs = require("fs");
const docx = require("docx");
const convertInchesToTwip = docx.convertInchesToTwip;
const convertMillimetersToTwip = docx.convertMillimetersToTwip;

const docx_doc_1 = { sections: [], styles: [] };
const docx_sect_2 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_p_3 = {};
docx_p_3.children = [];
docx_p_3.tabStops = [];
docx_p_3.text = "Hello World";
const docx_p_3Obj = new docx.Paragraph(docx_p_3);
docx_sect_2.children.push(docx_p_3Obj);
docx_doc_1.sections.push(docx_sect_2)
const docx_sect_4 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_page_5 = {};
const docx_pageNumbers_6 = {};
docx_pageNumbers_6.start = 1;
docx_pageNumbers_6.formatType = docx.NumberFormat.DECIMAL;
docx_page_5.pageNumbers = docx_pageNumbers_6;
docx_sect_4.properties.page = docx_page_5;
const docx_header_7 = {};
docx_header_7.children = [];
const docx_p_8 = {};
docx_p_8.children = [];
docx_p_8.tabStops = [];
docx_p_8.text = "First Default Header on another page";
const docx_p_8Obj = new docx.Paragraph(docx_p_8);
docx_header_7.children.push(docx_p_8Obj);
const docx_header_7Obj = new docx.Header(docx_header_7);
docx_sect_4.headers.default = docx_header_7Obj;
const docx_footer_9 = {};
docx_footer_9.children = [];
const docx_p_10 = {};
docx_p_10.children = [];
docx_p_10.tabStops = [];
docx_p_10.text = "Footer on another page";
const docx_p_10Obj = new docx.Paragraph(docx_p_10);
docx_footer_9.children.push(docx_p_10Obj);
const docx_footer_9Obj = new docx.Footer(docx_footer_9);
docx_sect_4.footers.default = docx_footer_9Obj;
const docx_p_11 = {};
docx_p_11.children = [];
docx_p_11.tabStops = [];
docx_p_11.text = "hello";
const docx_p_11Obj = new docx.Paragraph(docx_p_11);
docx_sect_4.children.push(docx_p_11Obj);
docx_doc_1.sections.push(docx_sect_4)
const docx_sect_12 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_page_13 = {};
if (!docx_page_13.size) { docx_page_13.size = {} };
docx_page_13.size.orientation = docx.PageOrientation.LANDSCAPE;
const docx_pageNumbers_14 = {};
docx_pageNumbers_14.start = 1;
docx_pageNumbers_14.formatType = docx.NumberFormat.DECIMAL;
docx_page_13.pageNumbers = docx_pageNumbers_14;
docx_sect_12.properties.page = docx_page_13;
const docx_header_15 = {};
docx_header_15.children = [];
const docx_p_16 = {};
docx_p_16.children = [];
docx_p_16.tabStops = [];
docx_p_16.text = "Second Default Header on another page";
const docx_p_16Obj = new docx.Paragraph(docx_p_16);
docx_header_15.children.push(docx_p_16Obj);
const docx_header_15Obj = new docx.Header(docx_header_15);
docx_sect_12.headers.default = docx_header_15Obj;
const docx_footer_17 = {};
docx_footer_17.children = [];
const docx_p_18 = {};
docx_p_18.children = [];
docx_p_18.tabStops = [];
docx_p_18.text = "Footer on another page";
const docx_p_18Obj = new docx.Paragraph(docx_p_18);
docx_footer_17.children.push(docx_p_18Obj);
const docx_footer_17Obj = new docx.Footer(docx_footer_17);
docx_sect_12.footers.default = docx_footer_17Obj;
const docx_p_19 = {};
docx_p_19.children = [];
docx_p_19.tabStops = [];
docx_p_19.text = "hello in landscape";
const docx_p_19Obj = new docx.Paragraph(docx_p_19);
docx_sect_12.children.push(docx_p_19Obj);
docx_doc_1.sections.push(docx_sect_12)
const docx_sect_20 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_page_21 = {};
if (!docx_page_21.size) { docx_page_21.size = {} };
docx_page_21.size.orientation = docx.PageOrientation.PORTRAIT;
docx_sect_20.properties.page = docx_page_21;
const docx_header_22 = {};
docx_header_22.children = [];
const docx_p_23 = {};
docx_p_23.children = [];
docx_p_23.tabStops = [];
const docx_txt_24 = {};
docx_txt_24.children = [];
docx_txt_24.children.push("Page number: ");
docx_txt_24.children.push(docx.PageNumber.CURRENT);
const docx_txt_24Obj = new docx.TextRun(docx_txt_24);
docx_p_23.children.push(docx_txt_24Obj);
const docx_p_23Obj = new docx.Paragraph(docx_p_23);
docx_header_22.children.push(docx_p_23Obj);
const docx_header_22Obj = new docx.Header(docx_header_22);
docx_sect_20.headers.default = docx_header_22Obj;
const docx_p_27 = {};
docx_p_27.children = [];
docx_p_27.tabStops = [];
docx_p_27.text = "Page number in the header must be 2, because it continues from the previous section.";
const docx_p_27Obj = new docx.Paragraph(docx_p_27);
docx_sect_20.children.push(docx_p_27Obj);
docx_doc_1.sections.push(docx_sect_20)
const docx_sect_28 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_page_29 = {};
if (!docx_page_29.size) { docx_page_29.size = {} };
docx_page_29.size.orientation = docx.PageOrientation.PORTRAIT;
const docx_pageNumbers_30 = {};
docx_pageNumbers_30.formatType = docx.NumberFormat.UPPER_ROMAN;
docx_page_29.pageNumbers = docx_pageNumbers_30;
docx_sect_28.properties.page = docx_page_29;
const docx_header_31 = {};
docx_header_31.children = [];
const docx_p_32 = {};
docx_p_32.children = [];
docx_p_32.tabStops = [];
const docx_txt_33 = {};
docx_txt_33.children = [];
docx_txt_33.children.push("Page number: ");
docx_txt_33.children.push(docx.PageNumber.CURRENT);
const docx_txt_33Obj = new docx.TextRun(docx_txt_33);
docx_p_32.children.push(docx_txt_33Obj);
const docx_p_32Obj = new docx.Paragraph(docx_p_32);
docx_header_31.children.push(docx_p_32Obj);
const docx_header_31Obj = new docx.Header(docx_header_31);
docx_sect_28.headers.default = docx_header_31Obj;
const docx_p_36 = {};
docx_p_36.children = [];
docx_p_36.tabStops = [];
docx_p_36.text = "Page number in the header must be III, because it continues from the previous section, but is defined as upper roman.";
const docx_p_36Obj = new docx.Paragraph(docx_p_36);
docx_sect_28.children.push(docx_p_36Obj);
docx_doc_1.sections.push(docx_sect_28)
const docx_sect_37 = { properties: {}, headers:{}, footers:{}, children: [] };
const docx_page_38 = {};
if (!docx_page_38.size) { docx_page_38.size = {} };
docx_page_38.size.orientation = docx.PageOrientation.PORTRAIT;
const docx_pageNumbers_39 = {};
docx_pageNumbers_39.start = 25;
docx_pageNumbers_39.formatType = docx.NumberFormat.DECIMAL;
docx_page_38.pageNumbers = docx_pageNumbers_39;
docx_sect_37.properties.page = docx_page_38;
const docx_header_40 = {};
docx_header_40.children = [];
const docx_p_41 = {};
docx_p_41.children = [];
docx_p_41.tabStops = [];
const docx_txt_42 = {};
docx_txt_42.children = [];
docx_txt_42.children.push("Page number: ");
docx_txt_42.children.push(docx.PageNumber.CURRENT);
const docx_txt_42Obj = new docx.TextRun(docx_txt_42);
docx_p_41.children.push(docx_txt_42Obj);
const docx_p_41Obj = new docx.Paragraph(docx_p_41);
docx_header_40.children.push(docx_p_41Obj);
const docx_header_40Obj = new docx.Header(docx_header_40);
docx_sect_37.headers.default = docx_header_40Obj;
const docx_p_45 = {};
docx_p_45.children = [];
docx_p_45.tabStops = [];
docx_p_45.text = "Page number in the header must be 25, because it is defined to start at 25 and to be decimal in this section.";
const docx_p_45Obj = new docx.Paragraph(docx_p_45);
docx_sect_37.children.push(docx_p_45Obj);
docx_doc_1.sections.push(docx_sect_37)

const docx_MainObject = new docx.Document(docx_doc_1);

docx.Packer.toBuffer(docx_MainObject).then((buffer) => {
    fs.writeFileSync("multiple-sections.docx", buffer);
    console.log("DONE written")
});