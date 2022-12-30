const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const calenderSchema = new Schema({
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
export default mongoose.model("calender", calenderSchema, "calenders");
