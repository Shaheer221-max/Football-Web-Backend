import express from "express";
import adminRouter from "./admin.route";
import coachRouter from "./coach.route";
import playerRouter from "./player.route";
import calenderRouter from "./calender.route";
import groupsRouter from "./groups.route";
import clubhubRouter from "./clubhub.route";
import postRouter from "./post.route";
import shopRouter from "./shop.route";
import chatRouter from "./chat.route";
import likesRouter from "./likes.route";
import commentRouter from "./comment.route";
import authGuard from "../middleware/authGuard.middleware";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from server");
});

router.use("/admin", adminRouter);
router.use("/player", playerRouter);
router.use("/event",calenderRouter );
router.use("/groups",groupsRouter );
router.use("/clubhub",clubhubRouter );
router.use("/post",postRouter );
router.use("/shop",shopRouter );
router.use("/coach",coachRouter );
router.use("/chat",chatRouter );
router.use("/likes",likesRouter );
router.use("/comment",commentRouter );

export default router;
