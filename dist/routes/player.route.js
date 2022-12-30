"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const player_controller_1 = __importDefault(require("../controller/player.controller"));
const playerRouter = express_1.default.Router();
playerRouter.post("/addplayer", player_controller_1.default.addplayer);
playerRouter.get("/getplayers", player_controller_1.default.getPlayer);
playerRouter.get("/totalplayers", player_controller_1.default.totalPlayer);
playerRouter.get("/findPlayer/:name", player_controller_1.default.findPlayer);
// playerRouter.delete("/deleteplayer", playerController.deleteplayer);
exports.default = playerRouter;
//# sourceMappingURL=player.route.js.map