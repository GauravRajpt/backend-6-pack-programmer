const http= require('http')

http.createServer((req,res)=>{
    res.end("<h1>hii</h1>")
}).listen(5000,()=>{
    console.log("hiii")
});