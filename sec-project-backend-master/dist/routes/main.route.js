"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const campaign_route_1 = __importDefault(require("./campaign.route"));
const authGuard_middleware_1 = __importDefault(require("../middleware/authGuard.middleware"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("hello from server");
});
router.use("/user", user_route_1.default);
router.use("/campaign", authGuard_middleware_1.default, campaign_route_1.default);
exports.default = router;
//# sourceMappingURL=main.route.js.map