import router from "../routes/main.route";
import clubhub from "../models/clubhub.model";
import { response } from "express";

const mongoose = require('mongoose');


//let User = require('../models/User');

const jwt = require("jsonwebtoken");


//VALIDATION
const Joi = require("@hapi/joi");

//validation for register data
const registerValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email : Joi.string().min(3).required(),
  isFolder : Joi.boolean()
});


const clubhubController = {

  async createFolder(req, res) {
    const { error } = registerValidationSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let clubhubData = req.body;
      let clubhubb = new clubhub(clubhubData);
      const nameExists = await clubhub.findOne({
        name: clubhubb.name,
        email : clubhubb.email
      });
      if (nameExists) {
        console.log("already exisits");
        res.status(400).send("Folder already exists");
      } else {
       
        clubhubb.save((error, folder) => {
          if (error) {
            res.send(error.message);
          } else {
            const token = jwt.sign(
              { _id: folder._id },
              process.env.TOKEN_SECRET
            );
            res.status(200).send({
              authToken: token,
              name: folder.name,
              email : folder.email,
              isFolder : folder.isFolder,
              _id: folder._id,
            });
          }
        });
      }
    }
  },

  // upload file

//router.post('/user-profile', upload.single('profileImg'), 
async uploadFile(req, res, next) {
    const id = req.params.id;
    const file = req.file.filename
    let size = req.file.size
    let fileSiseInMb
    const date = new Date();
    
    console.log("file uploaded", id, file, size)
    if (id.toString() === "false"){
      res.status(400).send("Please Select the Folder");
    }
    else if (!file){
      res.status(400).send("File not selected");
    }
    else {
      if(size < 1048576){
          fileSiseInMb = (Math.floor(size / 1024)) + "Kb"
      }else {
        fileSiseInMb = (Math.floor(size / (1024 * 1024))) + "Mb"
      }
      
      const nameExists = await clubhub.find({
        _id: id,
        files : {
          $elemMatch : {
            name : file
          }
          
        }
      });
      //if (!nameExists)
      {
        const newFile = {
          name : file,
          date : date,
          size : fileSiseInMb
        }
        const upload = await clubhub.findOneAndUpdate(
              {_id : id},
              {$push : {
                files : newFile
              }}
          )
          res.status(200).send({
              data: upload.files,
            });

      } 
      //else{
      //     res.status(400).send("File with same name Already Exists");
      //   }
      
    }

    
},

async getFile(req, res) {
  let id = req.params.id
  let data = await clubhub.find({
    _id: id,
  });
  
  res.status(200).send({
    data: data[0].files,
  });
},


  

  async getFolders(req, res) {
    let email = req.params.email
    let data = await clubhub.find({
      email: email,
    });
    
    res.status(200).send({
      data: data,
    });
  },

};

export default clubhubController;

// router.post("/login", async (req, res) => {
// });
