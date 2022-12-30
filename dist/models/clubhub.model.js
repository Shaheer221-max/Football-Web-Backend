"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clubhuhSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    files: {
        type: Array,
    },
    isFolder: {
        type: Boolean,
    }
});
exports.default = mongoose.model("clubhub", clubhuhSchema, "clubhub");
//# sourceMappingURL=clubhub.model.js.map