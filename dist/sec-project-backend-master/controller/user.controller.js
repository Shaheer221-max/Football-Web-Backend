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
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//VALIDATION
const Joi = require("@hapi/joi");
//validation for register data
const registerValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
    isAdmin: Joi.boolean(),
});
//validation for login data
const loginValidationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
});
const userController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = registerValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let userData = req.body;
                let user = new user_model_1.default(userData);
                const emailExists = yield user_model_1.default.findOne({
                    email: user.email,
                });
                if (emailExists) {
                    console.log("already exisits");
                    res.status(400).send("Email address Already exists try loging in");
                }
                else {
                    const salt = yield bcrypt.genSalt(10);
                    user.password = yield bcrypt.hash(user.password, salt);
                    user.save((error, registeredUser) => {
                        if (error) {
                            res.send(error.message);
                        }
                        else {
                            const token = jwt.sign({ _id: registeredUser._id }, process.env.TOKEN_SECRET);
                            res.status(200).send({
                                authToken: token,
                                name: registeredUser.name,
                                email: registeredUser.email,
                                _id: registeredUser._id,
                            });
                        }
                    });
                }
            }
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = loginValidationSchema.validate(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
            }
            else {
                const userData = req.body;
                const user = new user_model_1.default(userData);
                const foundUser = yield user_model_1.default.findOne({ email: userData.email });
                if (!foundUser) {
                    res.status(400).send("Email or Password is wrong");
                }
                else {
                    const validPass = yield bcrypt.compare(user.password, foundUser.password);
                    if (!validPass) {
                        res.status(400).send("Email or Password is wrong");
                    }
                    else {
                        const token = jwt.sign({ _id: foundUser._id }, process.env.TOKEN_SECRET);
                        res.status(200).send({
                            authToken: token,
                            name: foundUser.name,
                            email: foundUser.email,
                            _id: foundUser._id,
                            isAmdin: foundUser.isAdmin,
                        });
                    }
                }
            }
        });
    },
};
exports.default = userController;
// router.post("/login", async (req, res) => {
// });
//# sourceMappingURL=user.controller.js.map