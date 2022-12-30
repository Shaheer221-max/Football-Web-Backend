import express from "express";
import shopController from "../controller/shop.controller";

const shopRouter = express.Router();

shopRouter.post("/additem", shopController.additem);
shopRouter.get("/getItems", shopController.getItems);
shopRouter.put("/updateitem/:name", shopController.updateitem);

export default shopRouter;
