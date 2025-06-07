const fs = require("fs");
const pptx = require("pptxgenjs");
const sharp = require("sharp");

const ppt_doc_1 = new pptx();
const ppt_doc_1_debug = { defaultStyle: {}, styles: {}, slides: [] };
async function generatePresentation(callback) {
    const defaultStyle = { content: {} };
    const styles = {};
    const ppt_defaultStyleDef_2 = {};
    ppt_defaultStyleDef_2.fontFace = "Verdana";
    ppt_defaultStyleDef_2.fontSize = 8;
    defaultStyle.content = ppt_defaultStyleDef_2;
    ppt_doc_1_debug.defaultStyle = ppt_defaultStyleDef_2;
    const ppt_slide_3 = ppt_doc_1.addSlide();
    const ppt_slide_3_debug = { items: [] };
    var ppt_p_4 = Object.assign({}, defaultStyle.content);
    const ppt_p_4_text = "Simplest text";
    ppt_p_4.y = 1;
    ppt_p_4.x = 1;
    ppt_p_4.align = "left";
    ppt_p_4.isTextBox = true;
    ppt_slide_3.addText(ppt_p_4_text, ppt_p_4);
    ppt_slide_3_debug.items.push({ text: ppt_p_4_text, options: ppt_p_4 });
    const ppt_image_5 = {};
    ppt_image_5.y = "52%";
    ppt_image_5.x = "2%";
    ppt_image_5.w ="96%";
    ppt_image_5.h ="46%";
    const svgString_6 = `
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 120'>
            <defs>
                <linearGradient id='barGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop style='stop-color:#2d9cdb;stop-opacity:1' offset='0%'></stop>
                    <stop style='stop-color:#56ccf2;stop-opacity:1' offset='50%'></stop>
                    <stop style='stop-color:#2d9cdb;stop-opacity:1' offset='100%'></stop>
                </linearGradient>
                <linearGradient id='barGradient2' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop style='stop-color:#4a90a4;stop-opacity:1' offset='0%'></stop>
                    <stop style='stop-color:#7fb3d3;stop-opacity:1' offset='50%'></stop>
                    <stop style='stop-color:#4a90a4;stop-opacity:1' offset='100%'></stop>
                </linearGradient>
            </defs>
            <path fill='url(#barGradient)' stroke='#333' strokeWidth='1' d='M 60,20A 20,20 0 0 1 60,60 H260 A 20,20 0 1 0 260,20 Z' style='stroke:#333;stroke-width:1;'></path>
            <circle fill='white' cx='93.33333333333333' cy='40' r='6.666666666666667'></circle>
            <line stroke='#000' strokeWidth='1' x1='93.33333333333333' y1='33.333333333333336' x2='93.33333333333333' y2='-160' style='stroke:#000;stroke-width:1;'></line>
            <circle fill='#fff' stroke='#000' strokeWidth='1' cx='93.33333333333333' cy='-160' r='20' style='stroke:#000;stroke-width:1;'></circle>
            <text fill='#333333' x='93.33333333333333' y='-152' fontFamily='Arial, sans-serif' fontSize='24' fontWeight='bold' textAnchor='middle' style='font-family:Arial, sans-serif;font-size:24;font-weight:bold;text-anchor:middle;'>01</text>
            <text class='step-text' x='133.33333333333331' y='-160' textAnchor='middle' style='text-anchor:middle;'>aaa</text>
            <text class='step-text' x='133.33333333333331' y='-145' textAnchor='middle' style='text-anchor:middle;'>bbb</text>
            <text class='step-text' x='133.33333333333331' y='-130' textAnchor='middle' style='text-anchor:middle;'>ccc</text>
        </svg>
    `
    const base64Png_7 = await svgStringToBase64Png(svgString_6);
    ppt_image_5.data = base64Png_7;
    console.log("data", base64Png_7)
    ppt_slide_3.addImage(ppt_image_5);
    ppt_slide_3_debug.items.push({ image: ppt_image_5 });
    ppt_doc_1_debug.slides.push(ppt_slide_3_debug);
    callback();
}
async function svgStringToBase64Png(svgString) {
    const buffer = await sharp(Buffer.from(svgString))
    .resize(800) // Optional resize
    .png()
    .toBuffer();
    return `data:image/png;base64,${buffer.toString("base64")}`;
}
generatePresentation(() => {
    
    // Dump for test
    fs.writeFileSync(__dirname + "/p01.ppt.json", JSON.stringify(ppt_doc_1_debug, null, "	"));
    
    // Make Ppt
    
    var now = new Date();
    
    ppt_doc_1.writeFile(
        __dirname + "/p01.ppt"
    ).then(fileName => {
        console.log(`created file: ${fileName}`);
        console.log("DONE written", new Date() - now)
    });
});
