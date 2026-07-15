import { GoogleGenAI } from "@google/genai";

import { config } from "../configs/app.config.js";

const ai = new GoogleGenAI({
    apiKey: config.GEMINI_API_KEY,
});

const interaction = await ai.interactions.create({
    model: "gemini-2.5-flash",
    input: "Explain What is Youtube, explain in one sentense",
});
console.log(interaction.output_text);
