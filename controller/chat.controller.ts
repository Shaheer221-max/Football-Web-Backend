import router from "../routes/main.route";
import chat from "../models/chat.model";

const jwt = require("jsonwebtoken");

//VALIDATION
const Joi = require("@hapi/joi");

//validation for register data
// const eventValidationSchema = Joi.object({
//   message: Joi.string(),
//   from : Joi.string().required(),
//   to : Joi.string().required(),
//   reciever_img : Joi.string(),
//   reciever_status : Joi.string(),
//   reciever : Joi.string().required(),
//   image :  Joi.string(),
//   phone : Joi.required(),
//   position : Joi.string(),
//   Sender : Joi.string()
// });


const chatController = {
  
  async message(req, res) {
     {
        try {
            const {message, to, from, reciever_img, reciever_status, reciever, image, phone, position, Sender, Senderposition, Senderphone} = req.body;
            if((image.toString() === "no image" || image.toString() === "false") && message.toString() === "false"){
                return res.status(400).json("empty msg")
            }
            else{
                const token = jwt.sign(
                    { _id: chat._id },
                   process.env.TOKEN_SECRET
                   );
                //console.log(chatData);
                const newMsg = await chat.create({
                                authToken: token,
                                Message : message,
                                chatUser :[from, to, reciever_status],
                                Sender : Sender,
                                RecieverName : reciever,
                                RecieverImage : reciever_img,
                                RecieverPhone : phone,
                                RecieverPosition : position,
                                Image : image,
                                Senderphone : Senderphone,
                                Senderposition : Senderposition
                                
                })
                return res.status(200).json(newMsg)
            }
        
        } catch (error) {
            return res.status(400).json("something went wrong")
        }
    
        }
    },


    // get messages
    async getmessage(req, res) {
        try {
            
        const from = req.params.user1Id;
        const to = req.params.user2Id;
        

        const newMsg = await chat.find({
            chatUser : {
                $all : [from, to],
            }
        }).sort({updatedAt : -1});
       
        const allMsg = newMsg.map((msg, ind) => {
            return({
                myself : msg.chatUser[0].toString() === from,
                message : msg.Message,
                date : msg.updatedAt,
                pic : msg.Image
            }
            )
        })
        console.log("helloo",allMsg)

        return res.status(200).json(allMsg);
        } 
        catch (error) {
            return res.status(400).json("something went wrong")
        }
        
        },

// get all msgs
async getAllChats(req, res) {
    try {
            
        const Sender = req.params.user1Id;
        
        let msgs = []
        const newMsg = await chat.find({
            chatUser : {
                $in : [Sender],
            }
        }).sort({updatedAt : -1});
       
        const allMsg = newMsg.map((msg, ind) => {
// if send or recieved  
            let recievedOnly = false;
            let value = {reciever : msg.RecieverName,
                        messg : msg.Message,
                        date : msg.updatedAt,
                        to : msg.chatUser[1],
                        from : msg.chatUser[0],
                        img : msg.RecieverImage,
                        phone : msg.RecieverPhone,
                        position : msg.RecieverPosition,
                        status : msg.chatUser[2]};
            let value1 = {reciever : msg.Sender,
                        messg : msg.Message,
                        date : msg.updatedAt,
                        to : msg.chatUser[0],
                        from : msg.chatUser[1],
                        img : msg.RecieverImage,
                        phone : msg.Senderphone,
                        position : msg.Senderposition,
                        status : msg.chatUser[2]};

                    let value2 = {reciever : msg.RecieverName,
                            messg : "image",
                            date : msg.updatedAt,
                            to : msg.chatUser[1],
                            from : msg.chatUser[0],
                            img : msg.RecieverImage,
                            phone : msg.RecieverPhone,
                            position : msg.RecieverPosition,
                            status : msg.chatUser[2]};

                            let value3 = {reciever : msg.Sender,
                                messg : "image",
                                date : msg.updatedAt,
                                to : msg.chatUser[0],
                                from : msg.chatUser[1],
                                img : msg.RecieverImage,
                                phone : msg.Senderphone,
                                position : msg.Senderposition,
                                status : msg.chatUser[2]};
                        
                console.log(value, value1, Sender)
            let check =  (msgs.some((val, i) => {
                if ((val.to.toString() === value.to.toString()) || (val.to.toString() === value1.to.toString())){
                    
                    return true
                }else {
                    
                    return false}
            }))
            console.log(check);
            

            if (!check){
                if (value.to.toString() === Sender){
                    if(value.messg.toString() === "false"){
                        console.log(value.messg, "value1")
                        msgs.push(value3);
                    }else{msgs.push(value1);
                        console.log(value.messg, "value3")}
                    
                }else if (value1.to.toString() === Sender){
                    if(value1.messg.toString() === "false"){
                        msgs.push(value2);
                        console.log(value.messg, "value")
                    }else{msgs.push(value);
                        console.log(value.messg, "value2")}
                }
                    
            }
            console.log(msgs)
            return({
                msgs
            }
            )
        })

        return res.status(200).json(msgs);
        } 
        catch (error) {
            return res.status(400).json("something went wrong")
        }
        
  }, 
};

export default chatController;

