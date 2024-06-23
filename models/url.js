const mongoose = require("mongoose");
const urlSchmema  = new mongoose.Schema({

    shortId : {
        type:String,
        required:true,
        unique : true
    },
    redirectUrl :{
        type:String,
        required:true,
    },
    visitedHistory :  [{timestamps : {
            type: Number
        }}]
    

    }
,{timestamps : true});

const URL = mongoose.model('url', urlSchmema);

module.exports = URL;