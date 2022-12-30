import express from "express";
import calenderController from "../controller/calender.controller";

const calenderRouter = express.Router();

calenderRouter.post("/setEvent", calenderController.register);
calenderRouter.get("/getevent", calenderController.getEvent);

export default calenderRouter;
