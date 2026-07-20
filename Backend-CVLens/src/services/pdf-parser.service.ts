import { PDFParse } from "pdf-parse";

export const parsePDF = async function (buffer: Buffer) {
    const parser = new PDFParse({ data: buffer });

    const textResult = await parser.getText();
    const infoResult = await parser.getInfo();

    await parser.destroy(); // release worker resources

    return {
        text: textResult.text,
        pageCount: infoResult.total,
    };
};
