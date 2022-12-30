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
const admin_model_1 = __importDefault(require("../models/admin.model"));
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
    isAdmin: Joi.boolean(),
});
//validation for login data
const loginValidationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(3).required(),
});
const adminController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = registerValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let adminData = req.body;
                let admin = new admin_model_1.default(adminData);
                const emailExists = yield admin_model_1.default.findOne({
                    email: admin.email,
                });
                if (emailExists) {
                    console.log("already exisits");
                    res.status(400).send("Email address Already exists try loging in");
                }
                else {
                    const salt = yield bcrypt.genSalt(10);
                    admin.password = yield bcrypt.hash(admin.password, salt);
                    admin.save((error, registeredadmin) => {
                        if (error) {
                            res.send(error.message);
                        }
                        else {
                            const token = jwt.sign({ _id: registeredadmin._id }, process.env.TOKEN_SECRET);
                            res.status(200).send({
                                authToken: token,
                                name: registeredadmin.name,
                                email: registeredadmin.email,
                                phone: registeredadmin.phone,
                                isAdmin: registeredadmin.isAdmin,
                                _id: registeredadmin._id,
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
                const adminData = req.body;
                const admin = new admin_model_1.default(adminData);
                const foundadmin = yield admin_model_1.default.findOne({ email: adminData.email });
                if (!foundadmin) {
                    res.status(400).send("Email or Password is wrong");
                }
                else {
                    const validPass = yield bcrypt.compare(admin.password, foundadmin.password);
                    if (!validPass) {
                        res.status(400).send("Email or Password is wrong");
                    }
                    else {
                        const token = jwt.sign({ _id: foundadmin._id }, process.env.TOKEN_SECRET);
                        res.status(200).send({
                            authToken: token,
                            name: foundadmin.name,
                            email: foundadmin.email,
                            _id: foundadmin._id,
                            isAmdin: foundadmin.isAdmin,
                        });
                    }
                }
            }
        });
    },
    getAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            let data = yield admin_model_1.default.find({
                startedBy: user.startedBy,
            });
            res.status(200).send({
                data: data,
            });
        });
    },
    getadminByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminData = req.params.email;
            console.log(adminData);
            const foundadmin = yield admin_model_1.default.findOne({
                email: adminData
            });
            if (!foundadmin) {
                res.status(400).send("no admin exists");
            }
            else {
                res.status(200).send({
                    data: foundadmin,
                });
            }
        });
    },
};
exports.default = adminController;
// router.post("/login", async (req, res) => {
// });
//# sourceMappingURL=admin.controller.js.map