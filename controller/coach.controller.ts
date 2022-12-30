import router from "../routes/main.route";
import coachh from "../models/coach.model";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//VALIDATION
const Joi = require("@hapi/joi");

//validation for register data
const registerValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  password: Joi.string().min(3).required(),
  phone : Joi.number().integer(),
  iscoach: Joi.boolean(),
});

//validation for login data
const loginValidationSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(3).required(),
});

const coachController = {
  async register(req, res) {
    const { error } = registerValidationSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let coachData = req.body;
      let coach = new coachh(coachData);
      const emailExists = await coachh.findOne({
        email: coach.email,
      });
      if (emailExists) {
        console.log("already exisits");
        res.status(400).send("Email address Already exists try loging in");
      } else {
        const salt = await bcrypt.genSalt(10);
        coach.password = await bcrypt.hash(coach.password, salt);
        coach.save((error, registeredcoach) => {
          if (error) {
            res.send(error.message);
          } else {
            const token = jwt.sign(
              { _id: registeredcoach._id },
              process.env.TOKEN_SECRET
            );
            res.status(200).send({
              authToken: token,
              name: registeredcoach.name,
              email: registeredcoach.email,
              phone: registeredcoach.phone,
              iscoach : registeredcoach.iscoach,
              _id: registeredcoach._id,
            });
          }
        });
      }
    }
  },
  async login(req, res) {
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const coachData = req.body;
      const coach = new coachh(coachData);
      const foundcoach = await coachh.findOne({ email: coachData.email });

      if (!foundcoach) {
        res.status(400).send("Email or Password is wrong");
      } else {
        const validPass = await bcrypt.compare(
          coach.password,
          foundcoach.password
        );
        if (!validPass) {
          res.status(400).send("Email or Password is wrong");
        } else {
          const token = jwt.sign(
            { _id: foundcoach._id },
            process.env.TOKEN_SECRET
          );
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
  },

  async getcoach(req, res) {
    let user = req.query;
    let data = await coachh.find({
      startedBy: user.startedBy,
    });
    
    res.status(200).send({
      data: data,
    });
  },

  async getcoachByEmail(req, res) {
    const coachData = req.params.email;
    console.log(coachData);
    const foundcoach = await coachh.findOne({
      email : coachData  
    })
    if (!foundcoach ) {
      
      res.status(400).send("no coach exists");
       
    } else{
      res.status(200).send({
        data: foundcoach,
      });
    }
}, 


};

export default coachController;

// router.post("/login", async (req, res) => {
// });
