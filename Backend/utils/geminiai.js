import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const getGeminiApiResponse = async(message) => {
    try {
        // const {message} = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: message,
        });

        console.log(response); // debug

        const reply = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";
        
        return reply;
        // res.json({reply});

    }catch(err) {
        console.error(err);
        return "Error generating response";
    }
};

export default getGeminiApiResponse;

