import router from "../routes/main.route";
import shop from "../models/shop.model";

const jwt = require("jsonwebtoken");

//VALIDATION
const Joi = require("@hapi/joi");

//validation for register data
const eventValidationSchema = Joi.object({
  name: Joi.string().required(),
  price : Joi.number().required(),
  quantity : Joi.number().required(),
  image: Joi.string().required(),
  isitem : Joi.boolean()
});


const shopController = {
  async additem(req, res) {
    const { error } = eventValidationSchema.validate(req.body);
      
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let itemData = req.body;
      let item = new shop(itemData);
      const founditem = await shop.findOne({
        name : itemData.name 
      })
      if(founditem ) {
        
        res.status(400).send("item already exists");
         
      } else{
      item.save((error, item) => {
        if (error) {
          res.send(error.message);
        }else{
                const token = jwt.sign(
                    { _id: item._id },
                    process.env.TOKEN_SECRET
                  );
                  res.status(200).send({
                    name: item.name,
                    price : item.price,
                    quantity : item.quantity,
                    image : item.image,
                    isitem : item.isitem 
                  });
              }
               
        });
      }
    }
  },

  // update Name
  async updateitem(req, res) {
      
    {
      let itemData = req.body;
      let item = new shop(itemData);
      const founditem = await shop.findOne({
        name : itemData.name 
      })
      if(founditem ) {
        
        res.status(400).send("item already exists");
         
      } else{
      
       
          shop.findOneAndUpdate({name : req.params.name}, {
            $set: {
              name: req.body.name
            }
          })
          .then(result => {
            res.status(200).json({
              updated_folder : result
            })
          })
      }
    }
  },


  // get items 
  async getItems(req, res) {
    let user = req.query;
    let data = await shop.find({
      startedBy: user.startedBy,
    });
    res.status(200).send({
      data: data,
    });
  }, 

  
};

export default shopController;

// router.post("/login", async (req, res) => {
// });
