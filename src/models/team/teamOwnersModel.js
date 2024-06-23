const mongoose = require("mongoose");

var teamOwnersSchema = mongoose.Schema(
  {
    name: String,
    img: { type: Array },
    position: String,
    title: String,
    description: String,

    facebook: String,
    twitter: String,
    instagram: String,
    whatsapp: String,
    linkedin: String,
  },
  { versionKey: false, timestamps: true }
);

var TeamOwnersModel = mongoose.model("teamowners", teamOwnersSchema);
module.exports = TeamOwnersModel;
