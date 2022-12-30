"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shopSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    image: {
        type: String,
        required: true,
    },
    isitem: {
        type: Boolean,
    }
});
exports.default = mongoose.model("shop", shopSchema, "shops");
//# sourceMappingURL=shop.model.js.map