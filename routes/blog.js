import express from "express"
import multer from "multer"
import { CreateBlogPost, GetAllBlogs, UpdateBlogPost, DeleteBlogPost } from "../controllers/blogController.js"

const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/addblog", upload.single("picture"),CreateBlogPost)
router.get("/getallblogs", GetAllBlogs)
router.put("/updateblog", upload.single("picture"),UpdateBlogPost)
router.delete("/deleteblog/:id", DeleteBlogPost)
export default router