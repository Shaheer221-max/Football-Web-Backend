import router from "../routes/main.route";
import group from "../models/groups.model";
import upload from "../middleware/uploadFiles.middleware";

const jwt = require("jsonwebtoken");

//VALIDATION
const Joi = require("@hapi/joi");

//validation for register data
const eventValidationSchema = Joi.object({
  name: Joi.string().required(),
  pic: Joi.string(),
  members : Joi.array(),
  admin_email : Joi.string().required(),
  
});


const groupsController = {
  async createGroup(req, res) {
    const { error } = eventValidationSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).send(error.details[0].message);
    } else {
      let eventData = req.body;
      let event = new group(eventData);
      event.save((error, event) => {
        if (error) {
          res.send(error.message);
        } else {
          const token = jwt.sign(
            { _id: event._id },
            process.env.TOKEN_SECRET
          );
          res.status(200).send({
            name: event.name,
            pic: event.pic,
            members: event.members,
            admin_email : event.admin_email,
            
          });
        }
      
       
        
        });
      }
  },


  // get groups
  async getgroup(req, res) {
      const groupData = req.params.email;
      console.log(groupData);
        const foundgroup= await group.find({
          members : {
            $elemMatch : {
              email : groupData
            }
          }
          })
      if (!foundgroup ) {
        
        res.status(400).send("no group exists");
         
      } else{
        res.status(200).send({
          data: foundgroup,
          length : foundgroup.length
        });
      }
  }, 

  // get groups
  async getgroupMember(req, res) {
    const groupData = req.params.email;
    const foundMember = await group.findOne({
      members: {
        $elemMatch : {
          email : groupData
        }
      }})
    if (!foundMember ) {
      
      res.status(400).send("no group exists");
       
    } else{
      res.status(200).send({
        data: foundMember.members,
      });
    }
}, 
 
  // posting posts
  async UploadPost(req, res) {
    let id = req.params.id;
    let post = req.body.post;
    if (post == null){
      res.status(400).send("post cannot be empty");
    }
    else{
      const upload = await group.findOneAndUpdate(
        {_id : id},
        {$push : {
          posts : {
            post : post
          }
        }}
    )
    if (!upload){
      res.status(400).send("no group exists");
    }
   
    else{
      res.status(200).send({
        data: upload,
      });
    }
    }
    
  },

   // get group by Id
   async getgroupbyId(req, res) {
    const groupData = req.params.id;
    const foundMember = await group.findOne({
      _id : groupData})
    if (!foundMember ) {
      
      res.status(400).send("no group exists");
       
    } else{
      res.status(200).send({
        data: foundMember,
      });
    }
}, 


  
};

export default groupsController;

// router.post("/login", async (req, res) => {
// });
