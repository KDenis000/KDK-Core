import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import {
    searchInformation
}
from "./sources.js";


dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());



// Test

app.get("/",(req,res)=>{

    res.send(
        "KDK Core Information Server Running 🚀"
    );

});




// AI information route

app.post("/ask",
async(req,res)=>{


    const question =
    req.body.question;



    const information =
    await searchInformation(
        question
    );



    res.json({

        reply:
        information.answer,

        source:
        information.source

    });


});




app.listen(
process.env.PORT || 3000,
()=>{

console.log(
"KDK Core Server Started"
);

});
