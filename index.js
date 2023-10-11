import { config } from "dotenv";
import express from "express"
import cors from "cors"
import corsOption from "./configs/corsOption.js"
import connectDB from "./configs/mongodb.js"
import userrouter from "./routes/user.js";
import blogrouter from "./routes/blog.js";
import commentrouter from './routes/comment.js'
import likerouter from './routes/like.js'

const app = express();
const port = process.env.PORT || 3600; // fixed typo and made it dynamic
config()

connectDB()

app.use(express.json());
app.use(cors(corsOption));

////// user routes //////
app.use("/user", userrouter)

///// blog routes ///////
app.use("/blog", blogrouter)

////// comments route /////
app.use("/comment", commentrouter)

//////// Like /////////
app.use("/like", likerouter)
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
