import { PDFParse } from "pdf-parse";

export const parsePDF = async function (buffer: Buffer) {
    const parser = new PDFParse(Uint8Array.from(buffer));
    const [textResult, infoResult] = await Promise.all([parser.getText(), parser.getInfo()]);

    await parser.destroy();

    return {
        text: textResult.text,
        pageCount: infoResult.total,
    };
};
