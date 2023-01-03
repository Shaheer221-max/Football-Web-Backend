import router from "../routes/main.route";
import likes from "../models/likes.model";

const jwt = require("jsonwebtoken");

//VALIDATION
const Joi = require("@hapi/joi");

//validation for register data
const eventValidationSchema = Joi.object({
  post: Joi.object().required(),
  
});


const likesController = {
 

  async addLikes(req,res){
    try {
      let likeData = req.body;
      let like = new likes(likeData);
      like.save((error, like) => {
        if (error) {
          res.send(error.message);
        } 
        else {
          const token = jwt.sign(
            { _id: like._id },
            process.env.TOKEN_SECRET
          );
          res.status(200).send({
            type : like.type,
            refOfPost : like.refOfPost,
            UserRef : like.UserRef
            
          });
        }        
        });
    } catch (error) {
      console.log(error)
    }
  },

  async removeLikes(req,res){
    try {
        let likeData = req.query.data;
        const result = await likes.deleteOne(
            {type : likeData.type,
            refOfPost : likeData.refOfPost,
            UserRef : likeData.UserRef}
            
        )
        res.status(200).send({
            data: result            
        })
        
      
    } catch (error) {
      console.log(error)
    }
  },

  async getLikes(req,res){
    try {
        let likeData = req.query;
        const foundlikes = await likes.find({
            type : likeData.data.type,
            refOfPost : likeData.data.refOfPost,
        })
        const result = foundlikes.length;
        //console.log(req.query, result);
        res.status(200).send({
            data: result            
        })
        
      
    } catch (error) {
      console.log(error)
    }
  },


  async personComment(req, res){
    try{
      let likeData = req.query
      const found = await likes.findOne({
        type: likeData.data.type,
        UserRef : likeData.data.UserRef,
        refOfPost : likeData.data.refOfPost,
      })
      if(found){
        let data = true;
        res.status(200).send({
          data: data           
      })
      }else{
        let data = false;
        res.status(200).send({
          data: data            
      })
      }
    }catch (error) {
      console.log(error)
    }
  }

  
};

export default likesController;