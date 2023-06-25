const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    course: {
      required: true,
      type: String,
    },
    sem: {
      required: true,
      type: Number,
    },
    branch: {
      required: true,
      type: String,
    },
    batch: {
      required: true,
      type: String,
    },
    data: {
      type: Number,
      required: true,
    },
  },
  { id: false }
);

module.exports = mongoose.model("LastUpdatedTime", dataSchema);
