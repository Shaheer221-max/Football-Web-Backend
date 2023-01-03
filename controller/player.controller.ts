import e from "express";
import playerr from "../models/player.model";

const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");



//validation for register data
const registerValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  fatherEmail: Joi.string().required(),
  position: Joi.string().required(),
  phone : Joi.number().integer(),
  dateOfBirth : Joi.date().required(),
  dateJoined : Joi.string().required(),
  image: Joi.string().required(),
  isPlayer: Joi.boolean(),
});


const playerController = {
  async addplayer(req, res) {
    const { error } = registerValidationSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let playerData = req.body;
      let player = new playerr(playerData);
      const emailExists = await playerr.findOne({
        email: player.email,
      });
      if (emailExists) {
        console.log("already exisits");
        res.status(400).send("Player Already exists");
      }
      else if(playerData.image == false){
        res.status(400).send("Image not selected");
      }
       else {
       
        player.save((error, registeredPlayer) => {
          if (error) {
            res.send(error.message);
          } else {
            const token = jwt.sign(
              { _id: registeredPlayer._id },
              process.env.TOKEN_SECRET
            );
            res.status(200).send({
              authToken: token,
              name: registeredPlayer.name,
              email: registeredPlayer.email,
              phone: registeredPlayer.phone,
              fatherEmail: registeredPlayer.fatherEmail,
              position: registeredPlayer.position,
              dateOfBirth : registeredPlayer.date,
              dateJoined : registeredPlayer.dateJoined,
              image: registeredPlayer.image,
              isPlayer : registeredPlayer.isPlayer,
              _id: registeredPlayer._id,
            });
          }
        });
      }
    }


   },

   async getPlayer(req, res) {
    let user = req.query;
    let data = await playerr.find({
      startedBy: user.startedBy,
    });
    res.status(200).send({
      data: data,
    });
  }, 

  async totalPlayer(req, res) {
    let user = req.query;
    let playerPresent = 0;
    let playerLeft = 0;
    let data = await playerr.find({
      startedBy: user.startedBy,
    });
    data.map((val,ind) => {
      if(val.dateLeft){
        playerLeft++;
      }
      else{
        playerPresent++
      }
    })

    res.status(200).send({
      totalPlayer: data.length,
      playerLeft : playerLeft,
      playerPresent : playerPresent
    });
  }, 

  async findPlayer(req, res) {
    
      const playername = req.params.name;
      const foundplayer = await playerr.find({ name: playername });

      if (!foundplayer) {
        res.status(400).send("Player not exist");
      } else{
        res.status(200).send({
          data: foundplayer,
        });
      }
     
  },
};

export default playerController;
