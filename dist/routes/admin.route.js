"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = __importDefault(require("../controller/admin.controller"));
const adminRouter = express_1.default.Router();
adminRouter.post("/register", admin_controller_1.default.register);
adminRouter.post("/login", admin_controller_1.default.login);
adminRouter.get("/getadmin", admin_controller_1.default.getAdmin);
adminRouter.get("/getadminByEmail/:email", admin_controller_1.default.getadminByEmail);
exports.default = adminRouter;
//# sourceMappingURL=admin.route.js.map