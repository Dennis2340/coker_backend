import express from "express"
const router = express.Router()
import { AddUser,GetAllUsers } from "../controllers/userController.js"

router.post("/adduser", AddUser)
router.get("/getalluser", GetAllUsers)
export default router