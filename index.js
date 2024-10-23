const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const Chat = require("./models/chat")
const methodOverride = require("method-override");
const ExpressError = require("./Expresserror")
let port= 8080;

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public"))) ;
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
.then(()=>{
    console.log("connection successfull");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakeerrorwhatsapp');
}

// let chat1 = new Chat({
//     from:"guddi",
//     To:"lalit",
//     msg:"how are you?",
//     created_at: new Date()
// });
// chat1.save().then((res) => {
//     console.log(res);
// });

app.listen(port,() => {
    console.log(`sever is listening at port ${port}`)
});



app.get("/",(req,res) => {
    res.send("It is working");
})

app.get("/chats",asyncWrap(async(req,res,next) => {
        let chats = await Chat.find();
        res.render("index.ejs",{chats});
}));
//new chat route
app.get("/chats/new",(req,res) => {
    // throw new ExpressError(404,"page not found");
    res.render("new.ejs");
});
app.post("/chats",asyncWrap(async(req,res,next) => {
    
        let{from,To,msg} = req.body;
        let chat1 = new Chat({
            from:from,
            To:To,
            msg:msg,
            created_at: new Date()
        });
       await chat1.save().then((res) => {
            console.log(res);
        });
        res.redirect("/chats");
}));

function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err) =>{
            next(err);
        })
    }
}

//edit route
app.get("/chats/:id/edit",asyncWrap(
    async (req,res,next) => {
 
        let {id} = req.params;
        let chat=  await Chat.findById(id);
        res.render("edit.ejs",{chat})
    }
))
//update route
app.put("/chats/:id",asyncWrap(
    async (req,res,next) => {
        let {id} = req.params;
        let {msg:newMsg} = req.body;
        let updatedchat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true})
        console.log( updatedchat );
        res.redirect("/chats");
    }
) )
//delete route
app.delete("/chats/:id", asyncWrap(async (req,res,next) => {

    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
}) )
//new show route
// app.get("/chats/:id",async(req,res) => {
    
//     let {id} = req.params;
//     let chat = await Chat.findById(id);
//     res.render("edit.ejs",{chat})
// })
app.get("/admin" ,(req,res) => {
    throw new ExpressError(403,"Acess to student is Forbidden");
})

//to print error name
app.use((err,req,res,next) => {
    console.log(err.name);
    if(err.name == "ValidationError"){
        console.log("This was a Validation Error")
    }
    next(err);
    });

//error handling Middleware
app.use((err,req,res,next)=>{
    let {status=404,message="some error occured"}=err;
    res.status(status).send(message);

});

