import router from "../routes/main.route";
import adminn from "../models/admin.model";

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
  isAdmin: Joi.boolean(),
});

//validation for login data
const loginValidationSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(3).required(),
});

const adminController = {
  async register(req, res) {
    const { error } = registerValidationSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let adminData = req.body;
      let admin = new adminn(adminData);
      const emailExists = await adminn.findOne({
        email: admin.email,
      });
      if (emailExists) {
        console.log("already exisits");
        res.status(400).send("Email address Already exists try loging in");
      } else {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
        admin.save((error, registeredadmin) => {
          if (error) {
            res.send(error.message);
          } else {
            const token = jwt.sign(
              { _id: registeredadmin._id },
              process.env.TOKEN_SECRET
            );
            res.status(200).send({
              authToken: token,
              name: registeredadmin.name,
              email: registeredadmin.email,
              phone: registeredadmin.phone,
              isAdmin : registeredadmin.isAdmin,
              _id: registeredadmin._id,
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
      const adminData = req.body;
      const admin = new adminn(adminData);
      const foundadmin = await adminn.findOne({ email: adminData.email });

      if (!foundadmin) {
        res.status(400).send("Email or Password is wrong");
      } else {
        const validPass = await bcrypt.compare(
          admin.password,
          foundadmin.password
        );
        if (!validPass) {
          res.status(400).send("Email or Password is wrong");
        } else {
          const token = jwt.sign(
            { _id: foundadmin._id },
            process.env.TOKEN_SECRET
          );
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
  },

  async getAdmin(req, res) {
    let user = req.query;
    let data = await adminn.find({
      startedBy: user.startedBy,
    });
    
    res.status(200).send({
      data: data,
    });
  },

  async getadminByEmail(req, res) {
    const adminData = req.params.email;
    console.log(adminData);
    const foundadmin = await adminn.findOne({
      email : adminData  
    })
    if (!foundadmin ) {
      
      res.status(400).send("no admin exists");
       
    } else{
      res.status(200).send({
        data: foundadmin,
      });
    }
}, 


};

export default adminController;

// router.post("/login", async (req, res) => {
// });
