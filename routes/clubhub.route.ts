import express from "express";
import clubhubController from "../controller/clubhub.controller";
import upload from "../middleware/uploadFiles.middleware";

const groupsRouter = express.Router();


groupsRouter.post("/createfolder", clubhubController.createFolder);
groupsRouter.get("/getfolder/:email", clubhubController.getFolders);
groupsRouter.post('/uploadFile/:id', upload.single('fileupload'), clubhubController.uploadFile);
groupsRouter.get('/getFile/:id',clubhubController.getFile);

export default groupsRouter;
