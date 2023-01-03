import router from "../routes/main.route";
import commentt from "../models/comment.model";

const jwt = require("jsonwebtoken");

//VALIDATION
const Joi = require("@hapi/joi");

//validation for register data
const eventValidationSchema = Joi.object({
  post: Joi.object().required(),
  
});


const commentController = {
 

  async addComment(req,res){
    try {
      let commentData = req.body;
      console.log("add comment",commentData)
      let comment = new commentt(commentData);
      comment.save((error, comment) => {
        if (error) {
          res.send(error.message);
        } 
        else {
          const token = jwt.sign(
            { _id: comment._id },
            process.env.TOKEN_SECRET
          );
          res.status(200).send({
            type : comment.type,
            refOfPost : comment.refOfPost,
            UserRef : comment.UserRef,
            Comment : comment.Comment
            
          });
        }        
        });
    } catch (error) {
      console.log(error)
    }
  },

  
  async getComment(req,res){
    try {
        let commentData = req.query;
        const foundlikes = await commentt.find({
            type : commentData.data.type,
            refOfPost : commentData.data.refOfPost,
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



  
};

export default commentController;