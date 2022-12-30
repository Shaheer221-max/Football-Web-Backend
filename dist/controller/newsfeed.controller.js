"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const newsfeed_model_1 = __importDefault(require("../models/newsfeed.model"));
const jwt = require("jsonwebtoken");
//VALIDATION
const Joi = require("@hapi/joi");
//validation for register data
const eventValidationSchema = Joi.object({
    post: Joi.object().required(),
});
const newsfeedController = {
    posts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = eventValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let postData = req.body;
                console.log(postData);
                let post = new newsfeed_model_1.default(postData);
                post.save((error, post) => {
                    if (error) {
                        res.send(error.message);
                    }
                    else {
                        const token = jwt.sign({ _id: post._id }, process.env.TOKEN_SECRET);
                        res.status(200).send({
                            post: post.post,
                        });
                    }
                });
            }
        });
    },
    // get group by Id
    getnewsfeed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            let data = yield newsfeed_model_1.default.find({
                startedBy: user.startedBy,
            });
            res.status(200).send({
                data: data,
            });
        });
    },
    getrecentposts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            let recent = [];
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let data = yield newsfeed_model_1.default.find({
                startedBy: user.startedBy,
            });
            const recentposts = data.map((val, ind) => {
                if (val.post.date.slice(0, 10).toString() === date.toString()) {
                    recent.push(val);
                }
            });
            res.status(200).send({
                data: recent,
            });
        });
    },
};
exports.default = newsfeedController;
// router.post("/login", async (req, res) => {
// });
//# sourceMappingURL=newsfeed.controller.js.map