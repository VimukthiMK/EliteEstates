import express from "express"

const router = express.Router()

// Get all Users
router.get("/", getUsers)
// Update a user
router.put("/:id", updateUser)
// Delete a User
router.delete("/:id", deleteUser)
// 
router.post("/save", savePost)
router.get("/profilePosts", profilePosts)
router.get("/notification", getNotificationNumber)

export default router