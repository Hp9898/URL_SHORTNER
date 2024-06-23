
const User = require("../models/user")
const {v4 : uuidv4}= require("uuid")
const {getUser
    ,setUser
}= require("../service/auth")
async function handleusersignup(req,res){
    const {username,email,password} = req.body;
    await User.create
    ({
        username,
        email,
        password
    })
    return res.render("home");
}

async function handleuserlogin(req,res){

    const {email,password} = req.body;
    const user = await User.findOne({
        email,password
    });
    if(!user){
      return res.render("login",{
        error  : "Invalid Username and Password "
      })
    }    
    const sessonid = uuidv4();
    setUser(sessonid,user);
    res.cookie("uid",sessonid);

    return res.redirect("/")
}

module.exports = {
    handleusersignup,
    handleuserlogin
}