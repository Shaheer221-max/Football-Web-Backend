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
const calender_model_1 = __importDefault(require("../models/calender.model"));
const jwt = require("jsonwebtoken");
//VALIDATION
const Joi = require("@hapi/joi");
//validation for register data
const eventValidationSchema = Joi.object({
    day: Joi.number().integer(),
    month: Joi.number().integer(),
    event: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
    year: Joi.number().integer(),
    isEvent: Joi.boolean(),
});
const calenderController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = eventValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let eventData = req.body;
                let event = new calender_model_1.default(eventData);
                event.save((error, event) => {
                    if (error) {
                        res.send(error.message);
                    }
                    else {
                        const token = jwt.sign({ _id: event._id }, process.env.TOKEN_SECRET);
                        res.status(200).send({
                            authToken: token,
                            day: event.day,
                            month: event.month,
                            year: event.year,
                            event: event.event,
                            title: event.title,
                            _id: event._id,
                        });
                    }
                });
            }
        });
    },
    getEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            let data = yield calender_model_1.default.find({
                startedBy: user.startedBy,
            });
            res.status(200).send({
                data: data,
            });
        });
    },
};
exports.default = calenderController;
// router.post("/login", async (req, res) => {
// });
//# sourceMappingURL=calender.controller.js.map