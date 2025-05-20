import express from "express";
import connectDB from "./Db/database.js";
import dotenv from "dotenv";
dotenv.config();

const app = express()


connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server started at port : ${process.env.PORT}`);

    })
})
    .catch((error) => {
        console.log('mongo db connection failed', error);

    })