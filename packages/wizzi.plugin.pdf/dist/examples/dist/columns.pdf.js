const fs = require("fs");
const pdfmake = require("pdfmake");

const pdf_doc_1 = { content: [], styles: {} };
const pdf_defaultStyleDef_2 = {};
pdf_defaultStyleDef_2.columnGap = 20;
pdf_doc_1.defaultStyle = pdf_defaultStyleDef_2;
const pdf_styleDef_3 = {};
pdf_styleDef_3.fontSize = 18;
pdf_styleDef_3.bold = true;
pdf_doc_1.styles["header"] = pdf_styleDef_3;
const pdf_styleDef_4 = {};
pdf_styleDef_4.fontSize = 15;
pdf_styleDef_4.italics = true;
pdf_doc_1.styles["bigger"] = pdf_styleDef_4;
const pdf_sect_5 = { content: [], styles: {} };
const pdf_p_6 = {};
pdf_p_6.text = [];
pdf_p_6.text.push("By default paragraphs are stacked one on top of (or actually - below) another.");
pdf_sect_5["content"].push(pdf_p_6);
const pdf_p_7 = {};
pdf_p_7.text = [];
pdf_p_7.text.push("It's possible however to split any paragraph (or even the whole document) into columns.");
pdf_sect_5["content"].push(pdf_p_7);
const pdf_p_8 = {};
pdf_p_8.text = [];
pdf_p_8.text.push("Here we go with 2 star-sized columns, with justified text and gap set to 20:\n\n");
pdf_sect_5["content"].push(pdf_p_8);
const pdf_columns_9 = {};
pdf_columns_9.columns = [];
pdf_columns_9.alignment = "justify";
const pdf_stack_10 = {};
pdf_stack_10.stack = [];
const pdf_p_11 = {};
pdf_p_11.text = [];
pdf_p_11.text.push("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.");
pdf_stack_10["stack"].push(pdf_p_11);
pdf_columns_9["columns"].push(pdf_stack_10);
const pdf_stack_12 = {};
pdf_stack_12.stack = [];
const pdf_p_13 = {};
pdf_p_13.text = [];
pdf_p_13.text.push("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.");
pdf_stack_12["stack"].push(pdf_p_13);
pdf_columns_9["columns"].push(pdf_stack_12);
pdf_sect_5["content"].push(pdf_columns_9);
const pdf_MainObject = { sections : [] };
pdf_sect_5.content.push({ text: ' ', pageBreak: 'after'});
pdf_MainObject.sections.push(pdf_sect_5);

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
    fs.writeFileSync(__dirname + "/columns.json", JSON.stringify(documentDefinition, null, "	"));

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
pdfDoc.pipe(fs.createWriteStream(__dirname + "/columns.pdf"));
pdfDoc.end();
console.log("DONE written", new Date() - now)
