import { UserModel } from '../../model/user'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { expressjwt } from 'express-jwt'

export const signUp = async (req, res) => {
  const error = validationResult(req)

  const { hashSync } = bcrypt

  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()[0].msg
    })
  }

  const admin = new UserModel(req.body)
  admin.password = hashSync(req.body.password, 10)
  admin.save((err, admin) => {
    if (err) {
      return res.status(400).json({
        err: 'cant save to db'
      })
    }
    return res.json({
      admin
    })
  })
}

export const signIn = async (req, res) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()[0].msg
    })
  }

  try {
    const { sign } = jwt
    const { compareSync } = bcrypt

    // find User
    const user = await UserModel.findOne({ email: req.body.email })

    // Check password
    if (!compareSync(req.body
      .password, user.password)) {
      return res.status(400).json({
        message: 'password of email does not match'
      })
    }

    // generate token
    const token = await sign({ _id: user._id }, process.env.SECRET)

    // Put token in cookie
    res.cookie('token', token, { expire: new Date() + 9999 })

    // return a response
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, name, email, role } })
  } catch (e) {
    return res.status(400).json({
      e
    })
  }
}

export const signOut = (req, res) => {
  res.clearCookie('token')
  res.json({
    message: 'signout sucessfully'
  })
}

export const getUserById = (req, res, next, id) => {
  UserModel.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        err: 'NO USER FOUND'
      })
    }
    // console.log(user)
    req.userprofile = user
    next()
  })
}

export const isUserSignedIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth'
})

export const isUserAuthenticated = (req, res, next) => {
  console.log(req.userprofile)
  console.log(req.auth)
  const checker = req.userprofile._id == req.auth._id
  // console.log(checker)
  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED'
    })
  }
  next()
}
