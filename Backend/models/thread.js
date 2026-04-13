import mongoose from "mongoose";

// Message Schema (stores each chat message)
const MessageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true
    }
    ,
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

// Thread Schema (stores entire conversation)
const ThreadSchema = new mongoose.Schema ({
    threadId : {
        type: String,
        required: true,
        unique: true
    },
    title : {
        type : String,
        default: "New Chat"
    },
    message : [MessageSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("thread", ThreadSchema);