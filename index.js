import { config } from "dotenv";
import express from "express"
import cors from "cors"
import corsOption from "./configs/corsOption.js"
import connectDB from "./configs/mongodb.js"
const app = express();
const port = process.env.PORT || 3600; // fixed typo and made it dynamic
config()

connectDB()

app.use(express.json());
app.use(cors(corsOption));

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
