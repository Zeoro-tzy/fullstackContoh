const mongoose = require("mongoose");

const schemaImg = new mongoose.Schema({
    filename : String,
    path : String,
    originalName : String
})

module.exports = mongoose.model("Image",schemaImg);
