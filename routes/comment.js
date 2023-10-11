import express from "express"
const router = express.Router()
import { AddComment } from "../controllers/optionsController.js"

router.post("/addcomment", AddComment)

export default router