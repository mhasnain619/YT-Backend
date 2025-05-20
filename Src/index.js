import express from "express";
import connectDB from "./Db/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express()


connectDB()