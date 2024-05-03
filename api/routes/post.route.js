import express from "express"

const router = express.Router()

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", verifyToken, addPost)
router.put("/:id", verifyToken, updatePost)
router.delete("/:id", verifyToken, deletePost)

export default router