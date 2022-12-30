"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clubhub_controller_1 = __importDefault(require("../controller/clubhub.controller"));
const uploadFiles_middleware_1 = __importDefault(require("../middleware/uploadFiles.middleware"));
const groupsRouter = express_1.default.Router();
groupsRouter.post("/createfolder", clubhub_controller_1.default.createFolder);
groupsRouter.get("/getfolder/:email", clubhub_controller_1.default.getFolders);
groupsRouter.post('/profile', uploadFiles_middleware_1.default.single('file'), clubhub_controller_1.default.uploadFile);
exports.default = groupsRouter;
//# sourceMappingURL=clubhub.route.js.map