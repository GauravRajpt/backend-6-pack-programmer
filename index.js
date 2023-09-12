
const express= require('express');
const { default: mongoose, Schema, Collection } = require('mongoose');
const path = require('path');
const app= express();
const cookieparser= require("cookie-parser");
const jwt= require("jsonwebtoken");
const exp = require('constants');

app.use(express.urlencoded())
app.use(cookieparser())

mongoose.connect('mongodb://127.0.0.1:27017',{
    dbName:'backend'
}).then(()=>{
    console.log("mongodb connect")
}).catch(e=>console.log(e))

const userschema= new Schema({
    name:String,
    email:String,
})

const User= mongoose.model("users",userschema);

const isAuthenticate= async (req,res,next)=>{
    const {token}= req.cookies;
   

    if(token){
        const jwttoken= jwt.verify(token,"jfjdkfjkjf");
      
        req.user=await User.findOne({_id:jwttoken._id});
        
      
       return next()
    }
    else{
        res.render("login.ejs")
    }
}

app.get("/login",isAuthenticate,(req,res)=>{
    res.redirect("/logout");
})

app.get("/logout",isAuthenticate,(req,res)=>{
  
    res.render("logout.ejs")
})

app.post("/login",async (req,res)=>{
    
    const {name,email}=req.body;
   const user= await User.create({
        name,
        email,
    })
  console.log(user)
   const id =jwt.sign({_id:user._id},"jfjdkfjkjf");
    
    res.cookie("token",id)
    res.redirect("/logout")
})

app.post("/logout",(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    })
    res.redirect("/login")
})

app.listen(5000,()=>{
    console.log("hi");
});
// const MessageSchema= new Schema({
//     name:String,
//     email:String,
// },{collection:"users"})



// const isAuthenticate=async (req,res,next)=>{
//     const {token}= req.cookies;
   
  
    
//     if(token){
//          const decoded= jwt.verify(token,"kdjfkdjf");
//        req.user= await User.findById(decoded._id);
//        console.log(req.user);
//         next()
//     }
//     else{
//         res.render("index",)
//     }

   
// }

// const User= mongoose.model("users",MessageSchema)
// const static= express.static(__dirname+"/public");
// app.use(express.urlencoded({extended:true}))
// app.use(cookieparser());
// app.use(static); //using middleware
// app.set("view engine", "ejs")
// app.get("/",isAuthenticate,(req,res)=>{
//     res.render("logout", {name:req.user.name});

   
// })

// app.get("/logout",(req,res)=>{

   
//     res.cookie("token",null,{
//         httpOnly:true,
//         expires:new Date(Date.now()),
//     })
//     res.redirect("/")
// })

// app.post("/login",async (req,res)=>{

   
   
    
//     const {name, email}= req.body;
//     let user= await User.findOne({ email });
//     if(!user){
//         return console.log("user does not exit");
//         }
         
//  user= await User.create({
//         name,
//         email
//     })
//     const jwtoken= jwt.sign({_id:user._id,},"kdjfkdjf");
//    res.cookie("token",jwtoken,{
//     httpOnly:true,
//     expires:new Date(Date.now()+60*1000)
//    })
//     res.redirect("/")
// })