const express= require('express')

const app= express();

app.get("/getproduct",(req,res)=>{
    // res.sendStatus(404)
    // res.json({
    //     result:1,
    //     product:[]
    // })
    res.status(404).json({Hii:'meri marzi'})
})

app.listen(5000,()=>{
    console.log("server is workng")
});
