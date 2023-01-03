import express from "express";
import likesController from "../controller/likes.controller";

const likesRouter = express.Router();

likesRouter.post("/addLikes", likesController.addLikes);
likesRouter.delete("/removeLikes", likesController.removeLikes);
likesRouter.get("/getLikes", likesController.getLikes);
likesRouter.get("/personComment", likesController.personComment);

export default likesRouter;
