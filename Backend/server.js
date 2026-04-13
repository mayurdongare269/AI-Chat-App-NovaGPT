// import { GoogleGenAI } from "@google/genai";
// import 'dotenv/config'

// // The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
// });

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: "Give me Gokes in hindi or marathi",
//   });
//   console.log(response.text);

// }

// main();

// %##################################

// method 2
import express from "express";
import 'dotenv/config';
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.post("/chat", async(req, res) => {
    try {
        const {message} = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: message,
        })

        console.log(response); // debug
        // const reply = response.response.text();
        // const reply = response?.response?.text() || "No response from AI";

        const reply = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";
        

        res.json({reply});

    }catch(err) {
        console.error(err);
        res.status(500).json({error: "something went wrong"});
    }
});

app.listen(PORT, () => {
    console.log(`server is running  on ${PORT}`);
})