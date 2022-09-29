import { BookModel, Library, UserModel } from '../../model/index.js'
import { expressjwt } from 'express-jwt'

export const getAdminById = (req, res, next, id) => {
  UserModel.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        err: 'NO USER FOUND'
      })
    }
    // console.log('user', user)
    req.profile = user
    next()
  })
}

export const getUser = (req, res) => {
  return res.status(200).json(req.userprofile)
}

export const getAllUser = (req, res) => {
  UserModel.find({ role: 0 }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ error: 'there is no user' })
    }
    return res.json({ user })
  })
}

export const getlib = (req, res) => {
  return res.status(200).json(req.libprofile)
}

export const getAlllib = (req, res) => {
  Library.find().exec((error, lib) => {
    if (error) {
      return res.status(400).json({
        error: 'there is no library'
      })
    }
    return res.status(400).json({ lib })
  })
}

export const getAllAdmin = (req, res) => {
  UserModel.find({ role: 2 }).exec((error, admin) => {
    if (error) {
      return res.status(400).json({ error: 'can\'t find admin' })
    }
    return res.status(200).json({ admin })
  })
}

export const getAdmin = (req, res) => {
  return res.status(200).json(res.profile)
}

// export const getBook = (req, res) => {
//   return res.status(200).json(req.book)
// }

export const getAllBook = (req, res) => {
  BookModel.find().exec((error, book) => {
    if (error) {
      return res.status(400).json({
        error: 'can\'t find books'
      })
    }
    return res.status(200).json({ book })
  })
}

export const isSignedIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth'
})

export const isAuthenticated = (req, res, next) => {
  // console.log('profile', req.profile)
  // console.log('auth', req.auth)
  const checker = req.profile._id == req.auth._id
  // console.log(checker)
  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED'
    })
  }
  next()
}

export const isAdmin = (req, res, next) => {
  if (!req.profile.role === 2) {
    return req.status(403).json({
      error: 'you are not Admin, access denied'
    })
  }
  next()
}
