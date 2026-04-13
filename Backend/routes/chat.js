import express from "express";

import Thread from "../models/thread.js"; // thread == chat... sequence of chat!!!
import getGeminiApiResponse from "../utils/geminiai.js"



const router = express.Router();

// for testing
router.post("/test", async(req, res) => {
    try {
        const newThread = new Thread({
            threadId: "xyz",
            title: "thread testing"
        });

        const response = await newThread.save();
        res.send(response);

    } catch(err) {
        console.log(err);
        res.status(500).send("failed to save in db");
    }
});


// get all thread/chats
router.get("/thread", async(req, res)=> {
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1});
        //descending order of updatedAt.. most recent data on top
        res.json(threads);
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "failed to fetched thread"} );
    }
});


//
router.get("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;

    try {
        const thread = await Thread.findOne({threadId: threadId});

        if(!thread) {
            return res.status(404).json({error: "Chat not found"});
        }

        res.json(thread.message);

    } catch(err) {
        console.log(err);
        res.status(500).json({error: "failed ot fetched chat.. "});
    }
});


router.delete("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;

    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(!deletedThread) {
            return res.status(404).json({error: "thread not found."});
        }
        res.status(200).json({message: "chat deleted successfully"});
    }catch(err) {
        console.log(err);
        res.status(500).json({error: "failed ot fetched chat.. "});
    }
});

//last route..
router.post("/chat", async(req, res) => {
    const {threadId, message} = req.body;

    if(!threadId || !message) {
        return res.status(400).json({error: "threadId and message is required"});
    }

    try {
        const thread = await Thread.findOne({threadId});

        if(!thread) {
            //create a new thread(chat) in db...
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role: "user", content: message}]
            });
        } else {
            thread.messages.push({role: "user", content: message});
        }

        const assistantReply = getGeminiApiResponse(message);
        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();

        await thread.save();
        res.json({reply: assistantReply});

    } catch(err) {
        console.log(err);
        res.status(500).json({error: "something went wrong"} );
    }
});



export default router;