import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async (params) => {
    try {
        await mongoose.connect(`${process.env.MONGOBD_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("error", error);
            throw error;
        })
    } catch (error) {
        console.log('mongodb connection error', error);
        process.exit(1)

    }
}
export default connectDB