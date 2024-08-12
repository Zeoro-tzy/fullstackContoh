const mongoose = require("mongoose");

const inputRadio = new mongoose.Schema({
    label : {
        type : String,
        required : true
    },
    isSelected : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model("radioButton",inputRadio)