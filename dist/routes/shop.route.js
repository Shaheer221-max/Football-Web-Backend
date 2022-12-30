"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shop_controller_1 = __importDefault(require("../controller/shop.controller"));
const shopRouter = express_1.default.Router();
shopRouter.post("/additem", shop_controller_1.default.additem);
shopRouter.get("/getItems", shop_controller_1.default.getItems);
shopRouter.put("/updateitem/:name", shop_controller_1.default.updateitem);
exports.default = shopRouter;
//# sourceMappingURL=shop.route.js.map