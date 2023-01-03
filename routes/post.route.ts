import express from "express";
import postController from "../controller/post.controller";

const postRouter = express.Router();

postRouter.post("/posts", postController.posts);
postRouter.get("/getpost", postController.getpost);
postRouter.get("/getrecentposts", postController.getrecentposts);
export default postRouter;
