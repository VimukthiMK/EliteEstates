import express from "express"
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  profilePosts
} from "../controllers/user.controller.js"
import {verifyToken} from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", getUsers)
router.get("/search/:id", verifyToken, getUser)
router.get("/profilePosts", verifyToken, profilePosts);
router.put("/:id", verifyToken, updateUser)
router.delete("/:id", verifyToken, deleteUser)

export default router