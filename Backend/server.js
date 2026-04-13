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
import mongoose from "mongoose";

import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
    console.log(`server is running  on ${PORT}`);
    connectDB(); // first check  is connection established or not with db...
})

//mongo connection
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }catch(err) {
        console.log("failed to connect", err);
    }
}





//below code logic in in utils...
// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
// });

// app.post("/chat", async(req, res) => {
//     try {
//         const {message} = req.body;

//         const response = await ai.models.generateContent({
//             model: "gemini-3-flash-preview",
//             contents: message,
//         })

//         console.log(response); // debug
//         // const reply = response.response.text();
//         // const reply = response?.response?.text() || "No response from AI";

//         const reply = response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";
        

//         res.json({reply});

//     }catch(err) {
//         console.error(err);
//         res.status(500).json({error: "something went wrong"});
//     }
// });

