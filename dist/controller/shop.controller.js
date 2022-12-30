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
const shop_model_1 = __importDefault(require("../models/shop.model"));
const jwt = require("jsonwebtoken");
//VALIDATION
const Joi = require("@hapi/joi");
//validation for register data
const eventValidationSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    image: Joi.string().required(),
    isitem: Joi.boolean()
});
const shopController = {
    additem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = eventValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let itemData = req.body;
                let item = new shop_model_1.default(itemData);
                const founditem = yield shop_model_1.default.findOne({
                    name: itemData.name
                });
                if (founditem) {
                    res.status(400).send("item already exists");
                }
                else {
                    item.save((error, item) => {
                        if (error) {
                            res.send(error.message);
                        }
                        else {
                            const token = jwt.sign({ _id: item._id }, process.env.TOKEN_SECRET);
                            res.status(200).send({
                                name: item.name,
                                price: item.price,
                                quantity: item.quantity,
                                image: item.image,
                                isitem: item.isitem
                            });
                        }
                    });
                }
            }
        });
    },
    // update Name
    updateitem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                let itemData = req.body;
                let item = new shop_model_1.default(itemData);
                const founditem = yield shop_model_1.default.findOne({
                    name: itemData.name
                });
                if (founditem) {
                    res.status(400).send("item already exists");
                }
                else {
                    shop_model_1.default.findOneAndUpdate({ name: req.params.name }, {
                        $set: {
                            name: req.body.name
                        }
                    })
                        .then(result => {
                        res.status(200).json({
                            updated_folder: result
                        });
                    });
                }
            }
        });
    },
    // get items 
    getItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            let data = yield shop_model_1.default.find({
                startedBy: user.startedBy,
            });
            res.status(200).send({
                data: data,
            });
        });
    },
};
exports.default = shopController;
// router.post("/login", async (req, res) => {
// });
//# sourceMappingURL=shop.controller.js.map