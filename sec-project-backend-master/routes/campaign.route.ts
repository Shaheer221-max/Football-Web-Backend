import express from "express";
import campaignController from "../controller/campaign.controller";

const campaignRouter = express.Router();

campaignRouter.post("/addCampaign", campaignController.addCampaign);
campaignRouter.get("/getCampaigns", campaignController.getCampaigns);
campaignRouter.delete("/deleteCampaign", campaignController.deleteCampaign);

export default campaignRouter;
