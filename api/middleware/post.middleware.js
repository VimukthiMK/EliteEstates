import jwt from "jsonwebtoken"

export const verifyPostToken = (req, res, next) => {
  const token = req.cookies?.token
  
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" })
      }
      req.userId = payload.id 
      next()
    })
  } else {
    req.userId = null
    next()
  }
}

