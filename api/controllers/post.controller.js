import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"

// Get all posts
export const getPosts = async (req, res) => {
  const { type, city, property, bedroom, minPrice, maxPrice } = req.query
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: city || undefined,
        type: type || undefined,
        property: property || undefined,
        bedroom: parseInt(bedroom) || undefined,
        price: {
          gte: parseInt(minPrice) || undefined,
          lte: parseInt(maxPrice) || undefined,
        },
      },
    })

    res.status(200).json(posts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to get posts" })
  }
}

// Get Single Post
export const getPost = async (req, res) => {
  const id = req.query.id
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    })

    const userId = req.userId
    if (userId) {
      const saved = await prisma.savedPost.findFirst({
        where: {
            postId: id,
            userId: userId,
        },
      })
      return res.status(200).json({ ...post, isSaved: saved ? true : false })
    }
    
    res.status(200).json({ ...post, isSaved: false})
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to get post" })
  }
}


// Add new Post
export const addPost = async (req, res) => {
  const body = req.body
  const tokenUserId = req.userId

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    })
    res.status(200).json({newPost, message:"Post created Successfully"})
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to create post" })
  }
}

// Save Post
export const savePost = async (req, res) => {
  const postId = req.body.postId
  const userId = req.userId
  try {
    const savedPost = await prisma.savedPost.findFirst({
      where:{
          userId,
          postId,
        
      },
    })

    if(savedPost){
      await prisma.savedPost.delete({
        where:{
          id:savedPost.id
        },
      })
      res.status(200).json({message:"Post removed from saved List"})
    }
    else {
      await prisma.savedPost.create({
        data:{
          userId,
          postId,
        },
      })
      res.status(200).json({message:"Post Saved Successfully"})
    }
   
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to update posts" })
  }
}

// Update Post
export const updatePost = async (req, res) => {
  try {
    res.status(200).json()
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to update posts" })
  }
}

// Delete Post
export const deletePost = async (req, res) => {
  const id = req.params.id
  const tokenUserId = req.userId

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    })

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" })
    }

    await prisma.post.delete({
      where: { id },
    })

    res.status(200).json({ message: "Post deleted" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to delete post" })
  }
}