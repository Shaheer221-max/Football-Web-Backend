import express from "express";
import adminRouter from "./admin.route";
import coachRouter from "./coach.route";
import playerRouter from "./player.route";
import calenderRouter from "./calender.route";
import groupsRouter from "./groups.route";
import clubhubRouter from "./clubhub.route";
import newsfeedRouter from "./newsfeed.route";
import shopRouter from "./shop.route";
import chatRouter from "./chat.route";
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
router.use("/newsfeed",newsfeedRouter );
router.use("/shop",shopRouter );
router.use("/coach",coachRouter );
router.use("/chat",chatRouter );

export default router;
