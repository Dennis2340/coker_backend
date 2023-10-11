import express from "express"
const router = express.Router()
import { AddLike } from "../controllers/optionsController.js"

router.post("/addlike", AddLike)

export default router