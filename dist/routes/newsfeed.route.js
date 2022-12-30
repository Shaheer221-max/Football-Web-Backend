"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsfeed_controller_1 = __importDefault(require("../controller/newsfeed.controller"));
const newsfeedRouter = express_1.default.Router();
newsfeedRouter.post("/posts", newsfeed_controller_1.default.posts);
newsfeedRouter.get("/getnewsfeed", newsfeed_controller_1.default.getnewsfeed);
newsfeedRouter.get("/getrecentposts", newsfeed_controller_1.default.getrecentposts);
exports.default = newsfeedRouter;
//# sourceMappingURL=newsfeed.route.js.map