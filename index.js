const express= require('express')
const path = require('path');
const app= express();

app.get("/",(req,res)=>{

    const pathlocation= path.join(__dirname,"/index.html")
    res.sendFile(pathlocation)
})

app.listen(5000,()=>{
    console.log("hi")
});
