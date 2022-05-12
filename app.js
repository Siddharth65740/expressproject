let express=require("express")
let fs=require("fs")

const {response, request, urlencoded, json} = require("express");

let app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

userdetails=[]
fs.writeFileSync("user.json",JSON.stringify(userdetails),{flag:"a+"})
console.log("file is created and empty array is being stored.")
app.get("/home",(request,response)=>{
       //response.send("welcome to the world of express js ");
       response.sendFile(__dirname+"\\home.html")})

app.get("/about us",(req, res) =>{
        res.sendFile(__dirname+"\\aboutus.html")})

app.get("/contact us",(request,response)=>{
       //response.send("welcome to the world of express js ");
       response.sendFile(__dirname+"\\contactus.html")})

app.get("/signup",(request,response)=>{
       //response.send("welcome to the world of express js ");
       response.sendFile(__dirname+"\\signup.html")})

// app.get("/register",(request,response)=>{
//        //response.send("welcome to the world of express js ");
//        response.sendFile(__dirname+"\\register.html")})

app.post("/register",(request,response)=>{
    console.log(request.body)
    let userdetails=JSON.parse(fs.readFileSync("user.json"))
    userdetails.push(request.body)
    fs.writeFileSync("user.json",JSON.stringify(userdetails))
    console.log(userdetails)
    response.send("User is Registered")
})

app.get("/login",(request,response)=>{
        response.sendFile(__dirname+"\\login.html")
})

app.post("/checkuser",(request,response)=>{
    let loginform=request.body;
    let userdetails=JSON.parse(fs.readFileSync("user.json"))
    let user=userdetails.find(user=>user.username==loginform.username && user.password==loginform.password)
    if(user !=undefined){
            response.send("Login Successful")
    }
    else
    {
        response.send("Wrong Username or Password")
    }
})

app.listen(9090,()=>{console.log("server is running at port no:9090")})

