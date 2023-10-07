import express from "express"
import multer from "multer"
import { CreateBlogPost } from "../controllers/blogController.js"

const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/addblog", upload.single("picture"),CreateBlogPost)

export default router