const mongoose = require("mongoose");
const Chat = require("./models/chat")
main()
.then(()=>{
    console.log("connection successfull");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakeerrorwhatsapp');
}
let Allchats=[{
    from:"guddi",
    To:"lalit",
    msg:"how are you?",
    created_at: new Date()
},
{from:"manisha",
To:"lalit",
msg:"where are you?",
created_at: new Date()
},
{from:"guddi",
To:"manisha",
msg:"We are same",
created_at: new Date()
},
{from:"karan",
To:"manisha",
msg:"how are you doing?",
created_at: new Date()
},
{from:"karan",
To:"lalit",
msg:"Lets's go for a party tonight",
created_at: new Date()
},
{from:"anisha",
To:"roshan",
msg:"I want Icecream",
created_at: new Date()
},
{from:"anjali",
To:"lalit",
msg:"come to my home as soon as possible",
created_at: new Date()
},
{from:"guddi",
To:"lalit",
msg:"I want dark choclate",
created_at: new Date()
},
{from:"guddi",
To:"lalit",
msg:"I want cake",
created_at: new Date()
},
];
Chat.insertMany(Allchats);