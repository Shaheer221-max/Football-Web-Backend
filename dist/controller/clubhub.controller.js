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
const clubhub_model_1 = __importDefault(require("../models/clubhub.model"));
const mongoose = require('mongoose');
//let User = require('../models/User');
const jwt = require("jsonwebtoken");
//VALIDATION
const Joi = require("@hapi/joi");
//validation for register data
const registerValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    isFolder: Joi.boolean()
});
const clubhubController = {
    createFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = registerValidationSchema.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).send(error.details[0].message);
            }
            else {
                let clubhubData = req.body;
                let clubhubb = new clubhub_model_1.default(clubhubData);
                const nameExists = yield clubhub_model_1.default.findOne({
                    name: clubhubb.name,
                    email: clubhubb.email
                });
                if (nameExists) {
                    console.log("already exisits");
                    res.status(400).send("Folder already exists");
                }
                else {
                    clubhubb.save((error, folder) => {
                        if (error) {
                            res.send(error.message);
                        }
                        else {
                            const token = jwt.sign({ _id: folder._id }, process.env.TOKEN_SECRET);
                            res.status(200).send({
                                authToken: token,
                                name: folder.name,
                                email: folder.email,
                                isFolder: folder.isFolder,
                                _id: folder._id,
                            });
                        }
                    });
                }
            }
        });
    },
    // upload file
    //router.post('/user-profile', upload.single('profileImg'), 
    uploadFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const url = req.protocol + '://' + req.get('host')
            // const folder = req.params.name;
            // const file = req.body.file;
            // if (!file){
            //   res.status(400).send("post cannot be empty");
            // }
            //else{
            //   const upload = await clubhub.findOneAndUpdate(
            //     {name : folder},
            //     {$push : {
            //       files : {
            //         file : '/public/' + file.filename,
            //       }
            //     }}
            // )
            // res.status(200).send({
            //   data: upload,
            // });
            // }
        });
    },
    //   async uploadFile(req, res) {
    //       let clubhubData = req.body;
    //       let clubhubb = new clubhub(clubhubData);
    //         clubhubb.save((error, folder) => {
    //           if (error) {
    //             res.send(error.message);
    //           } else {
    //             const token = jwt.sign(
    //               { _id: folder._id },
    //               process.env.TOKEN_SECRET
    //             );
    //             res.status(200).send({
    //               authToken: token,
    //               name: folder.name,
    //               _id: folder._id,
    //             });
    //           }
    //         });
    //   },
    //  async addFiles(req, res){
    //   clubhub.findOneAndUpdate({name : req.params.name}, {
    //     $set: {
    //       name: req.body.name,
    //       files : req.body.files
    //     }
    //   })
    //   .then(result => {
    //     res.status(200).json({
    //       updated_folder : result
    //     })
    //   })
    //   .catch(error => {
    //     res.send(error.message);
    //   })
    //   // clubhub.findByIdAndUpdate({name : req.params.name}, req.body).
    //   // then (function() {
    //   //     clubhub.findOne({name : req.params}).then (function (clubhub){
    //   //       response.send(clubhub);
    //   //     })
    //   // })
    //  },
    getFolders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = req.params.email;
            let data = yield clubhub_model_1.default.find({
                email: email,
            });
            res.status(200).send({
                data: data,
            });
        });
    },
    // // multer files
    // async uploadFiles(req,res){
    //   res.send("Image Uploaded");
    // },
};
exports.default = clubhubController;
// router.post("/login", async (req, res) => {
// });
//# sourceMappingURL=clubhub.controller.js.map