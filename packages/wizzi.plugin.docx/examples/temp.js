// Example of how you would merge cells together (Rows and Columns) and apply shading
// Also includes an example on how to center tables
// Import from 'docx' rather than '../build' if you install from npm
const docx = require("docx");
const fs = require("fs");
// Generate a CV
// Import from 'docx' rather than '../build' if you install from npm
const {
    Document, Footer, Header, Packer, PageBreak, Paragraph, TextRun} = docx;

// Move + offset header and footer
// Import from 'docx' rather than '../build' if you install from npm
const doc = new Document({
    evenAndOddHeaderAndFooters: true,
    sections: [
        {
            headers: {
                default: new Header({
                    children: [
                        new Paragraph({
                            text: "Odd Header text",
                        }),
                        new Paragraph({
                            text: "Odd - Some more header text",
                        }),
                    ],
                }),
                even: new Header({
                    children: [
                        new Paragraph({
                            text: "Even header text",
                        }),
                        new Paragraph({
                            text: "Even - Some more header text",
                        }),
                    ],
                }),
            },
            footers: {
                default: new Footer({
                    children: [
                        new Paragraph({
                            text: "Odd Footer text",
                        }),
                    ],
                }),
                even: new Footer({
                    children: [
                        new Paragraph({
                            text: "Even Cool Footer text",
                        }),
                    ],
                }),
            },
            children: [
                new Paragraph({
                    children: [new TextRun("Hello World 1"), new PageBreak()],
                }),
                new Paragraph({
                    children: [new TextRun("Hello World 2"), new PageBreak()],
                }),
                new Paragraph({
                    children: [new TextRun("Hello World 3"), new PageBreak()],
                }),
                new Paragraph({
                    children: [new TextRun("Hello World 4"), new PageBreak()],
                }),
                new Paragraph({
                    children: [new TextRun("Hello World 5"), new PageBreak()],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
