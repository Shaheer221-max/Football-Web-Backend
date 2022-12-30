import express from "express";
import playerController from "../controller/player.controller";

const playerRouter = express.Router();

playerRouter.post("/addplayer", playerController.addplayer);
playerRouter.get("/getplayers", playerController.getPlayer);
playerRouter.get("/totalplayers", playerController.totalPlayer);
playerRouter.get("/findPlayer/:name", playerController.findPlayer);
// playerRouter.delete("/deleteplayer", playerController.deleteplayer);

export default playerRouter;
