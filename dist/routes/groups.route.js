"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groups_controller_1 = __importDefault(require("../controller/groups.controller"));
const groupsRouter = express_1.default.Router();
groupsRouter.post("/creategroup", groups_controller_1.default.createGroup);
groupsRouter.get("/getgroup/:email", groups_controller_1.default.getgroup);
groupsRouter.put("/UploadPost/:id", groups_controller_1.default.UploadPost);
groupsRouter.get("/getgroupMember/:email", groups_controller_1.default.getgroupMember);
groupsRouter.get("/getgroupbyId/:id", groups_controller_1.default.getgroupbyId);
exports.default = groupsRouter;
//# sourceMappingURL=groups.route.js.map