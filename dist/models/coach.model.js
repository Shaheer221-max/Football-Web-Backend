"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const coachSchema = new Schema({
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
    iscoach: {
        type: Boolean,
    }
});
exports.default = mongoose.model("coach", coachSchema, "coachs");
//# sourceMappingURL=coach.model.js.map