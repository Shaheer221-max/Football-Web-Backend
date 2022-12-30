"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    pic: {
        type: String,
    },
    members: {
        type: Array,
    },
    admin_email: {
        type: String,
        required: true,
    },
    posts: {
        type: Array,
        comments: {
            type: Array,
        },
        likes: {
            type: Number
        },
        post: {}
    },
});
exports.default = mongoose.model("group", groupSchema, "groups");
//# sourceMappingURL=groups.model.js.map