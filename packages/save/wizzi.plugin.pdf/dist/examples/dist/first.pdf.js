const fs = require("fs");
const pdfmake = require("pdfmake");

const pdf_doc_1 = { content: [], styles: {} };
const pdf_styleDef_2 = {};
pdf_styleDef_2.fontSize = 56;
pdf_styleDef_2.bold = true;
pdf_styleDef_2.italics = true;
pdf_styleDef_2.color = "red";
pdf_doc_1.styles["heading1"] = pdf_styleDef_2;
const pdf_styleDef_3 = {};
pdf_styleDef_3.fontSize = 32;
pdf_styleDef_3.color = "blue";
pdf_doc_1.styles["normal"] = pdf_styleDef_3;
const pdf_sect_4 = { content: [], styles: {} };
const pdf_p_5 = {};
pdf_p_5.text = [];
pdf_p_5.text.push("Titolo 1");
pdf_p_5.style = "heading1";
pdf_sect_4["content"].push(pdf_p_5);
const pdf_p_6 = {};
pdf_p_6.text = [];
pdf_p_6.text.push("Hello world");
pdf_sect_4["content"].push(pdf_p_6);
const pdf_txt_7 = {};
pdf_txt_7.text = "Bold hello";
pdf_txt_7.bold = true;
pdf_sect_4["content"].push(pdf_txt_7);
const pdf_txt_8 = {};
pdf_txt_8.text = "Italics hello";
pdf_txt_8.italics = true;
pdf_txt_8.fontSize = 32;
pdf_sect_4["content"].push(pdf_txt_8);
const pdf_p_9 = {};
pdf_p_9.text = [];
const pdf_txt_10 = {};
pdf_txt_10.text = "my hello in paragraph";
pdf_p_9["text"].push(pdf_txt_10);
pdf_sect_4["content"].push(pdf_p_9);
const pdf_image_11 = {};
pdf_image_11.image = "C:/My/wizzi/stfnbssl/stfnbssl.github.io/cosie/.wizzi/src/17marzo2021/images/1 mese.png";
pdf_image_11.width = 300;
pdf_image_11.height = 700;
pdf_sect_4["content"].push(pdf_image_11);
const pdf_ul_12 = {};
pdf_ul_12.ul = [];
const pdf_txt_13 = {};
pdf_txt_13.text = "list item 1";
pdf_ul_12["ul"].push(pdf_txt_13);
const pdf_txt_14 = {};
pdf_txt_14.text = "list item 2";
pdf_ul_12["ul"].push(pdf_txt_14);
pdf_sect_4["content"].push(pdf_ul_12);
const pdf_MainObject = { sections : [] };
pdf_sect_4.content.push({ text: ' ', pageBreak: 'after'});
pdf_MainObject.sections.push(pdf_sect_4);
const pdf_sect_15 = { content: [], styles: {} };
const pdf_p_16 = {};
pdf_p_16.text = [];
pdf_p_16.text.push("Hello table");
pdf_sect_15["content"].push(pdf_p_16);
const pdf_table_17 = {};
pdf_table_17.table = { body: [] };
pdf_table_17.layout = "lightHorizontalLines";
pdf_table_17.table.headerRows = 1;
pdf_table_17.table.widths = ['*','auto',100,'*'];
const pdf_tr_18 = {};
pdf_tr_18.tds = [];
const pdf_txt_19 = {};
pdf_txt_19.text = "First";
pdf_tr_18["tds"].push(pdf_txt_19);
const pdf_txt_20 = {};
pdf_txt_20.text = "Second";
pdf_tr_18["tds"].push(pdf_txt_20);
const pdf_txt_21 = {};
pdf_txt_21.text = "Third";
pdf_tr_18["tds"].push(pdf_txt_21);
const pdf_txt_22 = {};
pdf_txt_22.text = "The last one";
pdf_tr_18["tds"].push(pdf_txt_22);
pdf_table_17.table.body.push(pdf_tr_18.tds);
const pdf_tr_23 = {};
pdf_tr_23.tds = [];
const pdf_txt_24 = {};
pdf_txt_24.text = "Value 1";
pdf_tr_23["tds"].push(pdf_txt_24);
const pdf_txt_25 = {};
pdf_txt_25.text = "Value 2";
pdf_tr_23["tds"].push(pdf_txt_25);
const pdf_txt_26 = {};
pdf_txt_26.text = "Value 3";
pdf_tr_23["tds"].push(pdf_txt_26);
const pdf_txt_27 = {};
pdf_txt_27.text = "Value 4";
pdf_tr_23["tds"].push(pdf_txt_27);
pdf_table_17.table.body.push(pdf_tr_23.tds);
const pdf_tr_28 = {};
pdf_tr_28.tds = [];
const pdf_txt_29 = {};
pdf_txt_29.text = "Bold value";
pdf_txt_29.bold = true;
pdf_tr_28["tds"].push(pdf_txt_29);
const pdf_txt_30 = {};
pdf_txt_30.text = "Val 2";
pdf_tr_28["tds"].push(pdf_txt_30);
const pdf_txt_31 = {};
pdf_txt_31.text = "Val 3";
pdf_tr_28["tds"].push(pdf_txt_31);
const pdf_txt_32 = {};
pdf_txt_32.text = "Val 4";
pdf_tr_28["tds"].push(pdf_txt_32);
pdf_table_17.table.body.push(pdf_tr_28.tds);
pdf_sect_15["content"].push(pdf_table_17);
pdf_sect_15.content.push({ text: ' ', pageBreak: 'after'});
pdf_MainObject.sections.push(pdf_sect_15);

// Make Pdf

// Build document definition
var now = new Date();
var documentDefinition = pdf_doc_1;
pdf_MainObject.sections.forEach(section => {
    section.content.forEach(contentItem => {
        documentDefinition.content.push(contentItem);
    });
    Object.assign({}, documentDefinition.styles, section.styles);
});

// Dump for test
    fs.writeFileSync(__dirname + "/first.json", JSON.stringify(documentDefinition, null, "	"));

// Set fonts
var fonts = {
	Roboto: {
		normal: __dirname + "/fonts/Roboto-Regular.ttf",
		bold: __dirname + "/fonts/Roboto-Medium.ttf",
		italics: __dirname + "/fonts/Roboto-Italic.ttf",
		bolditalics: __dirname + "/fonts/Roboto-MediumItalic.ttf"
	}
};

// Create document
var printer = new pdfmake(fonts);
var pdfDoc = printer.createPdfKitDocument(documentDefinition);
pdfDoc.pipe(fs.createWriteStream(__dirname + "/first.pdf"));
pdfDoc.end();
console.log("DONE written", new Date() - now)
