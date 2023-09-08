const exp = require('constants');
const express= require('express');
const { default: mongoose, Schema, Collection } = require('mongoose');
const path = require('path');
const app= express();
const cookieparser= require("cookie-parser");


mongoose.connect('mongodb://127.0.0.1:27017',{
    dbName:'backend'
}).then(()=>{
    console.log("mongodb connect")
}).catch(e=>console.log(e))


const MessageSchema= new Schema({
    name:String,
    email:String,
},{collection:"Message"})

const isAuthenticate=(req,res,next)=>{
    const {token}= req.cookies;

    if(token){
        next()
    }
    else{
        res.render("login")
    }

   
}

const Message= mongoose.model("Message",MessageSchema)
const static= express.static(__dirname+"/public");
app.use(express.urlencoded({extended:true}))
app.use(cookieparser());
app.use(static); //using middleware
app.set("view engine", "ejs")
app.get("/",isAuthenticate,(req,res)=>{
    res.render("logout");

   
})

app.get("/logout",(req,res)=>{
    res.cookie("token",null,{
        httpOnly:true,
        expires:new Date(Date.now()),
    })
    res.redirect("/")
})

app.post("/login",(req,res)=>{
   res.cookie("token","123",{
    httpOnly:true,
    expires:new Date(Date.now()+60*1000)
   })
    res.redirect("/")
})

app.listen(5000,()=>{
    console.log("hi");
});
