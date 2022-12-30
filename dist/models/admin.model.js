"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    isAdmin: {
        type: Boolean,
    }
});
exports.default = mongoose.model("admin", adminSchema, "admins");
//# sourceMappingURL=admin.model.js.map