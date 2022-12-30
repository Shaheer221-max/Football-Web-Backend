const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const clubhuhSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email : {
    type : String,
    required : true
  },
  
  files: {
     type: Array,
  },
  isFolder : {
    type:Boolean,
  }
   
  
});
export default mongoose.model("clubhub", clubhuhSchema, "clubhub");
