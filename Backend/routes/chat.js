import express from "express";
import thread from "../models/thread";
import thread from "../models/thread";
import thread from "../models/thread";

const router = express.Router();

router.post("/test", async(req, res) => {
    try {
        const thread = new thread({
            threadId: "xyz",
            title: "thread testing"
        });

        const response = await thread.save();
        res.send(response);

    } catch(err) {
        console.log(err);
        res.status(500).send("failed to save in db");
    }
});

export default router;