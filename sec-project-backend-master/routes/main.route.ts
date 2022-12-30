import express from "express";
import userRouter from "./user.route";
import campaignRouter from "./campaign.route";
import authGuard from "../middleware/authGuard.middleware";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from server");
});

router.use("/user", userRouter);
router.use("/campaign", authGuard, campaignRouter);

export default router;
