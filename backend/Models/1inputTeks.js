const mongoose = require("mongoose");

const inputanSchema = new mongoose.Schema({
    teks : {
        type : String,
        required : true
    },
    checkbox : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model("SchemaInputan",inputanSchema);