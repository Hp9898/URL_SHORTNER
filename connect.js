const mongoose = require("mongoose");
async function connectwithmongodb(url){
    return mongoose.connect(url);
}

module.exports= {
    connectwithmongodb,
}