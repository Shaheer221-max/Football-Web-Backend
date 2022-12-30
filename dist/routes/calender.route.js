"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calender_controller_1 = __importDefault(require("../controller/calender.controller"));
const calenderRouter = express_1.default.Router();
calenderRouter.post("/setEvent", calender_controller_1.default.register);
calenderRouter.get("/getevent", calender_controller_1.default.getEvent);
exports.default = calenderRouter;
//# sourceMappingURL=calender.route.js.map