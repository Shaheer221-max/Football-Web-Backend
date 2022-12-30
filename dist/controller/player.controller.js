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
const player_model_1 = __importDefault(require("../models/player.model"));
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
//validation for register data
const registerValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    fatherEmail: Joi.string().required(),
    position: Joi.string().required(),
    phone: Joi.number().integer(),
    dateOfBirth: Joi.date().required(),
    dateJoined: Joi.string().required(),
    image: Joi.string().required(),
    isPlayer: Joi.boolean(),
});
const playerController = {
    addplayer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = registerValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let playerData = req.body;
                let player = new player_model_1.default(playerData);
                const emailExists = yield player_model_1.default.findOne({
                    email: player.email,
                });
                if (emailExists) {
                    console.log("already exisits");
                    res.status(400).send("Player Already exists");
                }
                else if (playerData.image == false) {
                    res.status(400).send("Image not selected");
                }
                else {
                    player.save((error, registeredPlayer) => {
                        if (error) {
                            res.send(error.message);
                        }
                        else {
                            const token = jwt.sign({ _id: registeredPlayer._id }, process.env.TOKEN_SECRET);
                            res.status(200).send({
                                authToken: token,
                                name: registeredPlayer.name,
                                email: registeredPlayer.email,
                                phone: registeredPlayer.phone,
                                fatherEmail: registeredPlayer.fatherEmail,
                                position: registeredPlayer.position,
                                dateOfBirth: registeredPlayer.date,
                                dateJoined: registeredPlayer.dateJoined,
                                image: registeredPlayer.image,
                                isPlayer: registeredPlayer.isPlayer,
                                _id: registeredPlayer._id,
                            });
                        }
                    });
                }
            }
        });
    },
    getPlayer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            let data = yield player_model_1.default.find({
                startedBy: user.startedBy,
            });
            res.status(200).send({
                data: data,
            });
        });
    },
    totalPlayer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            let playerPresent = 0;
            let playerLeft = 0;
            let data = yield player_model_1.default.find({
                startedBy: user.startedBy,
            });
            data.map((val, ind) => {
                if (val.dateLeft) {
                    playerLeft++;
                }
                else {
                    playerPresent++;
                }
            });
            res.status(200).send({
                totalPlayer: data.length,
                playerLeft: playerLeft,
                playerPresent: playerPresent
            });
        });
    },
    findPlayer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const playername = req.params.name;
            const foundplayer = yield player_model_1.default.find({ name: playername });
            if (!foundplayer) {
                res.status(400).send("Player not exist");
            }
            else {
                res.status(200).send({
                    data: foundplayer,
                });
            }
        });
    },
};
exports.default = playerController;
//# sourceMappingURL=player.controller.js.map