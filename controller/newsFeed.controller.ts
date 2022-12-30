import router from "../routes/main.route";
import newsfeed from "../models/newsfeed.model";
import upload from "../middleware/uploadFiles.middleware";

const jwt = require("jsonwebtoken");

//VALIDATION
const Joi = require("@hapi/joi");

//validation for register data
const eventValidationSchema = Joi.object({
  post: Joi.object().required(),
  
});


const newsfeedController = {
  async posts(req, res) {
    const { error } = eventValidationSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let postData = req.body;
      console.log(postData)
      let post = new newsfeed(postData);
      post.save((error, post) => {
        if (error) {
          res.send(error.message);
        } 
        else {
          const token = jwt.sign(
            { _id: post._id },
            process.env.TOKEN_SECRET
          );
          res.status(200).send({
            post: post.post,
            
            
          });
        }        
        });
      }
  },


   // get group by Id
   async getnewsfeed(req, res) {
    let user = req.query;
    let data = await newsfeed.find({
      startedBy: user.startedBy,
    });
    res.status(200).send({
      data: data,
    });
}, 

async getrecentposts(req, res) {
  let user = req.query;
  let recent = [];
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  

  let data = await newsfeed.find({
    startedBy: user.startedBy,
  });

  const recentposts = data.map((val,ind) =>{
    if(val.post.date.slice(0,10).toString() === date.toString()){
      recent.push(val)
    }
  })
  res.status(200).send({
    data: recent,
  });
}, 


  
};

export default newsfeedController;

// router.post("/login", async (req, res) => {
// });
