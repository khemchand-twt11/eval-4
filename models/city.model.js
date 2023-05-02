const mongoose = require("mongoose");

const citySchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const cityModel = mongoose.model("city", citySchema);

module.exports = { cityModel };
