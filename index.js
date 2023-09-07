const exp = require('constants');
const express= require('express');
const { default: mongoose, Schema, Collection } = require('mongoose');
const path = require('path');
const app= express();


mongoose.connect('mongodb://127.0.0.1:27017',{
    dbName:'backend'
}).then(()=>{
    console.log("mongodb connect")
}).catch(e=>console.log(e))


const MessageSchema= new Schema({
    name:String,
    email:String,
},{collection:"Message"})

const Message= mongoose.model("Message",MessageSchema)
const static= express.static(__dirname+"/public");
app.use(express.urlencoded({extended:true}))
app.use(static); //using middleware
app.set("view engine", "ejs")
app.get("/",(req,res)=>{
    
    res.render("index.ejs",{
        name:"gaurav"
    });
})



app.post("/contact",(req,res)=>{
   
    Message.create({name:req.body.name,email:req.body.email})
    res.send(req.body.name)
})

app.listen(5000,()=>{
    console.log("hi");
});
