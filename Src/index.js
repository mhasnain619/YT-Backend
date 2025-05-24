import app from "./app.js";
import connectDB from "./Db/database.js";

connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server started at port : ${process.env.PORT}`);

    })
})
    .catch((error) => {
        console.log('mongo db connection failed', error);

    })