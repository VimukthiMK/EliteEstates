import express from "express"
import {verifyToken} from "../middleware/auth.middleware.js"
import { addPost,
        deletePost, 
        getPost, 
        savePost,
        getPosts, 
        updatePost} from "../controllers/post.controller.js"
import {verifyPostToken} from "../middleware/post.middleware.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/post", verifyPostToken, getPost)
router.post("/", verifyToken, addPost)
router.post("/save",verifyToken, savePost)
router.put("/:id", verifyToken, updatePost)
router.delete("/:id", verifyToken, deletePost)


export default router