import router from "../routes/main.route";
import calenderr from "../models/calender.model";

const jwt = require("jsonwebtoken");

//VALIDATION
const Joi = require("@hapi/joi");

//validation for register data
const eventValidationSchema = Joi.object({
  day: Joi.number().integer(),
  month: Joi.number().integer(),
  event: Joi.string().min(3).required(),
  title: Joi.string().min(3).required(),
  year : Joi.number().integer(),
  isEvent: Joi.boolean(),
});


const calenderController = {
  async register(req, res) {
    const { error } = eventValidationSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let eventData = req.body;
      let event = new calenderr(eventData);
      event.save((error, event) => {
        if (error) {
          res.send(error.message);
        } else {
          const token = jwt.sign(
            { _id: event._id },
            process.env.TOKEN_SECRET
          );
          res.status(200).send({
            authToken: token,
            day: event.day,
            month: event.month,
            year: event.year,
            event: event.event,
            title:event.title,
            _id: event._id,
          });
        }
      
       
        
        });
      }
  },

  async getEvent(req, res) {
    let user = req.query;
    let data = await calenderr.find({
      startedBy: user.startedBy,
    });
    res.status(200).send({
      data: data,
    });
  }, 
  
};

export default calenderController;

// router.post("/login", async (req, res) => {
// });
