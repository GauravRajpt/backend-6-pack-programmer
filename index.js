const http= require('http')

http.createServer((req,res)=>{
    if(req.url==="/"){
        res.end("<h1>Home</h1>")
    }
    else if(req.url=="/about"){
        res.end("<h1>about page</h1>")
    }
    else if(req.url==="/contact"){
        res.end("<h1>contact page</h1>");
    }
    else{
        res.end("<h1>page not found</h1>")
    }
}).listen(5000,()=>{
    console.log("hiii")
});