"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coach_controller_1 = __importDefault(require("../controller/coach.controller"));
const coachRouter = express_1.default.Router();
coachRouter.post("/register", coach_controller_1.default.register);
coachRouter.post("/login", coach_controller_1.default.login);
coachRouter.get("/getcoach", coach_controller_1.default.getcoach);
coachRouter.get("/getcoachByEmail/:email", coach_controller_1.default.getcoachByEmail);
exports.default = coachRouter;
//# sourceMappingURL=coach.route.js.map