import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        createdAt: true,
      },
    })
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: "Failed to get users!" })
  }
}

// get a single user
export const getUser = async (req, res) => {
  const id = req.params.id 
  try {
    const user = await prisma.user.findUnique({
      select: { 
        id: true,
        email: true,
        username: true,
        avatar: true,
        createdAt: true,
      },
      where: { id },
    })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: "Failed to get user!" })
  }
}

// Update User
export const updateUser = async (req, res) => {
  const id = req.params.id
  const tokenUserId = req.userId // jwt cookie body
  const { password, avatar, ...inputs } = req.body

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" })
  }

  let updatedPassword = null
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10)
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    })

    const { password: userPassword, ...rest } = updatedUser // rest - without password

    res.status(200).json(rest)
  } catch (err) {
    res.status(500).json({ message: "Failed to update users!" })
  }
}

//Delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id
  const tokenUserId = req.userId

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" })
  }

  try {
    // Start a transaction
    await prisma.$transaction(async (prisma) => {
      // Delete Messages associated with the user's chats
      await prisma.message.deleteMany({
        where: {
          chat: {
            userIDs: {
              has: userId
            }
          }
        }
      })

      // Delete SavedPosts of the user
      await prisma.savedPost.deleteMany({
        where: {
          userId: userId
        }
      })

      // Delete Posts and PostDetails created by the user
      const userPosts = await prisma.post.findMany({
        where: {
          userId: userId
        }
      })

      for (const post of userPosts) {
        await prisma.postDetail.deleteMany({
          where: {
            postId: post.id
          }
        })
      }

      await prisma.post.deleteMany({
        where: {
          userId: userId
        }
      })

      // Delete Chats where the user is a participant
      await prisma.chat.deleteMany({
        where: {
          userIDs: {
            has: userId
          }
        }
      })

      // Delete the User
      await prisma.user.delete({
        where: {
          id: userId
        }
      })
    })
    res.status(200).json({message: "User deleted Successfully"})
  } catch (err) {
    res.status(500).json({ message: "Failed to delete users!" })
  }
}

// Get all Profile Posts and Saved Posts
export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    })
    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    })

    const savedPosts = saved.map((item) => item.post)
    res.status(200).json({ userPosts, savedPosts })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to get profile posts!" })
  }
}

// Get Notification Count
export const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId
  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    })
    res.status(200).json(number)
  } catch (err) {
    res.status(500).json({ message: "Failed to get profile posts!" })
  }
}