const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
  },
  fatherEmail : {
    type: String,
    required: true,
  },
  position : {
    type: String,
    required: true,
  },
  dateOfBirth : {
    type: Date,
    required: true,
  },
  phone : {
    type: Number,
    required: true,
  },
  image : {
    type: String,
  },
  dateJoined : {
    type : String,
  },
  dateLeft : {
    type : String,
  },
  isPlayer : {
    type : Boolean,
  }

});
export default mongoose.model("player", playerSchema, "players");
