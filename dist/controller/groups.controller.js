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
const groups_model_1 = __importDefault(require("../models/groups.model"));
const jwt = require("jsonwebtoken");
//VALIDATION
const Joi = require("@hapi/joi");
//validation for register data
const eventValidationSchema = Joi.object({
    name: Joi.string().required(),
    pic: Joi.string(),
    members: Joi.array(),
    admin_email: Joi.string().required(),
});
const groupsController = {
    createGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = eventValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let eventData = req.body;
                let event = new groups_model_1.default(eventData);
                event.save((error, event) => {
                    if (error) {
                        res.send(error.message);
                    }
                    else {
                        const token = jwt.sign({ _id: event._id }, process.env.TOKEN_SECRET);
                        res.status(200).send({
                            name: event.name,
                            pic: event.pic,
                            members: event.members,
                            admin_email: event.admin_email,
                        });
                    }
                });
            }
        });
    },
    // get groups
    getgroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupData = req.params.email;
            console.log(groupData);
            const foundgroup = yield groups_model_1.default.find({
                members: {
                    $elemMatch: {
                        email: groupData
                    }
                }
            });
            if (!foundgroup) {
                res.status(400).send("no group exists");
            }
            else {
                res.status(200).send({
                    data: foundgroup,
                    length: foundgroup.length
                });
            }
        });
    },
    // get groups
    getgroupMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupData = req.params.email;
            const foundMember = yield groups_model_1.default.findOne({
                members: {
                    $elemMatch: {
                        email: groupData
                    }
                }
            });
            if (!foundMember) {
                res.status(400).send("no group exists");
            }
            else {
                res.status(200).send({
                    data: foundMember.members,
                });
            }
        });
    },
    // posting posts
    UploadPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let post = req.body.post;
            if (post == null) {
                res.status(400).send("post cannot be empty");
            }
            else {
                const upload = yield groups_model_1.default.findOneAndUpdate({ _id: id }, { $push: {
                        posts: {
                            post: post
                        }
                    } });
                if (!upload) {
                    res.status(400).send("no group exists");
                }
                else {
                    res.status(200).send({
                        data: upload,
                    });
                }
            }
        });
    },
    // get group by Id
    getgroupbyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupData = req.params.id;
            const foundMember = yield groups_model_1.default.findOne({
                _id: groupData
            });
            if (!foundMember) {
                res.status(400).send("no group exists");
            }
            else {
                res.status(200).send({
                    data: foundMember,
                });
            }
        });
    },
};
exports.default = groupsController;
// router.post("/login", async (req, res) => {
// });
//# sourceMappingURL=groups.controller.js.map