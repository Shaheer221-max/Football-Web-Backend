import router from "../routes/main.route";
import postt from "../models/post.model";
import likes from "../models/likes.model";

const jwt = require("jsonwebtoken");

//VALIDATION
const Joi = require("@hapi/joi");

//validation for register data
const eventValidationSchema = Joi.object({
  post: Joi.object().required(),
  from: Joi.string().required(),
  
});


const postController = {
  async posts(req, res) {
    const { error } = eventValidationSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      let postData = req.body;
      let post = new postt(postData);
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
            from : post.from
            
          });
        }        
        });
      }
  },

  
   // get all posts
   async getpost(req, res) {
    let user = req.query.data;
    console.log(user)
    let data = await postt.find({
      from: user.from,
    })
    console.log(data)
    //.populate("{likes : likes}");
    res.status(200).send({
      data: data,
    });
}, 

async getrecentposts(req, res) {
  let user = req.query;
  console.log("recent post", user)
  let recent = [];
  const today = new Date();
  // const datetoday = today.toString()
  // const date = datetoday.slice(0,10)
  let date;

  if (today.getMonth() + 1 < 10){
    if(today.getDate() < 10){
      date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
  
    }
    else{
      date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
  
    }
  }
  else if(today.getDate() < 10){
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + today.getDate();
  
  }
  else {
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  
  }
  

  let data = await postt.find({
    from: "newsfeed",
  });

  const recentposts = data.map((val,ind) =>{
    console.log(val.post.date.slice(0,10).toString(), date.toString())
    if(val.post.date.slice(0,10).toString() === date.toString() && user.data.email.toString() !== val.post.email.toString()){
      recent.push(val)
    }
  })
  res.status(200).send({
    data: recent,
  });
}, 


};

export default postController;

// router.post("/login", async (req, res) => {
// });
