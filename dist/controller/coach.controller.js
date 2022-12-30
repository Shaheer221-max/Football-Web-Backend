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
const coach_model_1 = __importDefault(require("../models/coach.model"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//VALIDATION
const Joi = require("@hapi/joi");
//validation for register data
const registerValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
    phone: Joi.number().integer(),
    iscoach: Joi.boolean(),
});
//validation for login data
const loginValidationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
});
const coachController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = registerValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let coachData = req.body;
                let coach = new coach_model_1.default(coachData);
                const emailExists = yield coach_model_1.default.findOne({
                    email: coach.email,
                });
                if (emailExists) {
                    console.log("already exisits");
                    res.status(400).send("Email address Already exists try loging in");
                }
                else {
                    const salt = yield bcrypt.genSalt(10);
                    coach.password = yield bcrypt.hash(coach.password, salt);
                    coach.save((error, registeredcoach) => {
                        if (error) {
                            res.send(error.message);
                        }
                        else {
                            const token = jwt.sign({ _id: registeredcoach._id }, process.env.TOKEN_SECRET);
                            res.status(200).send({
                                authToken: token,
                                name: registeredcoach.name,
                                email: registeredcoach.email,
                                phone: registeredcoach.phone,
                                iscoach: registeredcoach.iscoach,
                                _id: registeredcoach._id,
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
                const coachData = req.body;
                const coach = new coach_model_1.default(coachData);
                const foundcoach = yield coach_model_1.default.findOne({ email: coachData.email });
                if (!foundcoach) {
                    res.status(400).send("Email or Password is wrong");
                }
                else {
                    const validPass = yield bcrypt.compare(coach.password, foundcoach.password);
                    if (!validPass) {
                        res.status(400).send("Email or Password is wrong");
                    }
                    else {
                        const token = jwt.sign({ _id: foundcoach._id }, process.env.TOKEN_SECRET);
                        res.status(200).send({
                            authToken: token,
                            name: foundcoach.name,
                            email: foundcoach.email,
                            _id: foundcoach._id,
                            isAmdin: foundcoach.iscoach,
                        });
                    }
                }
            }
        });
    },
    getcoach(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            let data = yield coach_model_1.default.find({
                startedBy: user.startedBy,
            });
            res.status(200).send({
                data: data,
            });
        });
    },
    getcoachByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const coachData = req.params.email;
            console.log(coachData);
            const foundcoach = yield coach_model_1.default.findOne({
                email: coachData
            });
            if (!foundcoach) {
                res.status(400).send("no coach exists");
            }
            else {
                res.status(200).send({
                    data: foundcoach,
                });
            }
        });
    },
};
exports.default = coachController;
// router.post("/login", async (req, res) => {
// });
//# sourceMappingURL=coach.controller.js.map