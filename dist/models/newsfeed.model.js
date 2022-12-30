"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newsFeedSchema = new Schema({
    post: {
        type: Object,
        required: true
    },
    comments: {
        type: Array,
    },
    likes: {
        type: Number
    },
});
exports.default = mongoose.model("newsFeed", newsFeedSchema, "newsFeed");
//# sourceMappingURL=newsfeed.model.js.map