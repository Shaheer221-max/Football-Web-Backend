import express from "express";
import adminController from "../controller/admin.controller";

const adminRouter = express.Router();

adminRouter.post("/register", adminController.register);
adminRouter.post("/login", adminController.login);
adminRouter.get("/getadmin", adminController.getAdmin);
adminRouter.get("/getadminByEmail/:email", adminController.getadminByEmail);

export default adminRouter;
