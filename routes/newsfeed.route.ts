import express from "express";
import newsfeedController from "../controller/newsfeed.controller";

const newsfeedRouter = express.Router();

newsfeedRouter.post("/posts", newsfeedController.posts);
newsfeedRouter.get("/getnewsfeed", newsfeedController.getnewsfeed);
newsfeedRouter.get("/getrecentposts", newsfeedController.getrecentposts);

export default newsfeedRouter;
