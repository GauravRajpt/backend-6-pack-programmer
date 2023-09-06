const exp = require('constants');
const express= require('express')
const path = require('path');
const app= express();


const user=[];

const static= express.static(__dirname+"/public");
app.use(express.urlencoded({extended:true}))
app.use(static); //using middleware
app.set("view engine", "ejs")
app.get("/",(req,res)=>{

    res.render("index.ejs",{
        name:"gaurav"
    });
})

app.get('/contact',(req,res)=>{
    res.send(user)
})

app.post("/contact",(req,res)=>{
    
    user.push({
        username:req.body.name,
        email:req.body.email,
    
    })
    res.render("success")
})

app.listen(5000,()=>{
    console.log("hi")
});
