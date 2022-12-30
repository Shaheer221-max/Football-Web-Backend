"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const calenderSchema = new Schema({
    day: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    event: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});
exports.default = mongoose.model("calender", calenderSchema, "calenders");
//# sourceMappingURL=calender.model.js.map