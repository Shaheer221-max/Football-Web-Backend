import express from "express";
import chatController from "../controller/chat.controller";

const chatRouter = express.Router();

chatRouter.post("/sendmessage", chatController.message);
chatRouter.get("/getmessage/:user1Id/:user2Id", chatController.getmessage);
chatRouter.get("/getAllChats/:user1Id", chatController.getAllChats);

export default chatRouter;
