const express = require("express");
const cors = require("cors")
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { blogRouter } = require("./routes/blogsRoutes");

const app = express();

app.use(express.json());
app.use("/" , userRouter)
app.use("/" , blogRouter)
app.use(cors())

app.listen(8080, async()=>{
    try {
        await connection;
        console.log("Connected to the DB")
        console.log("Server is running on port 8080")
    } catch (error) {
        console.log(error);
        console.log("Something went Wrong!")
    }
})