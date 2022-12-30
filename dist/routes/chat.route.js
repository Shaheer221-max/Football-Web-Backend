"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = __importDefault(require("../controller/chat.controller"));
const chatRouter = express_1.default.Router();
chatRouter.post("/sendmessage", chat_controller_1.default.message);
chatRouter.get("/getmessage/:user1Id/:user2Id", chat_controller_1.default.getmessage);
chatRouter.get("/getAllChats/:user1Id", chat_controller_1.default.getAllChats);
exports.default = chatRouter;
//# sourceMappingURL=chat.route.js.map