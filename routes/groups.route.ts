import express from "express";
import groupsController from "../controller/groups.controller";

const groupsRouter = express.Router();

groupsRouter.post("/creategroup", groupsController.createGroup);
groupsRouter.get("/getgroup/:email", groupsController.getgroup);
groupsRouter.put("/UploadPost/:id", groupsController.UploadPost);
groupsRouter.get("/getgroupMember/:email", groupsController.getgroupMember);
groupsRouter.get("/getgroupbyId/:id", groupsController.getgroupbyId);

export default groupsRouter;
