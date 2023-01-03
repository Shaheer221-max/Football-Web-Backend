import express from "express";
import commentController from "../controller/comment.controller";

const commentRouter = express.Router();

commentRouter.post("/addcomment", commentController.addComment);
// commentRouter.delete("/removecomment", commentController.removecomment);
commentRouter.get("/getcomment", commentController.getComment);
// commentRouter.get("/personComment", commentController.personComment);

export default commentRouter;
