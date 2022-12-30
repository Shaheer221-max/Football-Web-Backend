import express from "express";
import coachController from "../controller/coach.controller";

const coachRouter = express.Router();

coachRouter.post("/register", coachController.register);
coachRouter.post("/login", coachController.login);
coachRouter.get("/getcoach", coachController.getcoach);
coachRouter.get("/getcoachByEmail/:email", coachController.getcoachByEmail);

export default coachRouter;
