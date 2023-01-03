const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const likesSchema = new Schema({
  type: {
    type: String,
    required : true
  },
  UserRef: {
    type: String,
    required : true
  },
  refOfPost: {
    type: mongoose.Schema.ObjectId,
   // ref : "newsFeed",
    required : true
  },
});

export default mongoose.model("like", likesSchema, "likes");