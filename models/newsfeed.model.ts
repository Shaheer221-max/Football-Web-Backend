const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const newsFeedSchema = new Schema({
    post : {
        type : Object,
        required : true
    },
    comments : {
        type : Array,
      },
 
    likes : {
      type : Number
    }, 
});
export default mongoose.model("newsFeed", newsFeedSchema, "newsFeed");
