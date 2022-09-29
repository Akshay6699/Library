import { Library } from '../../model/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { expressjwt } from 'express-jwt'

export const getLibAdminById = (req, res, next, id) => {
  // console.log(req.params.libadminId)
  // const id = req.params.libadminId
  Library.findById(id).exec((err, user) => {
    if (err) {
      console.log(err)
      return res.status(400).json({
        err: 'can\'t find LidAdmin'
      })
    }
    // console.log(user)
    req.libprofile = user
    // console.log(req.libprofile)
    next()
  })
}

export const libSignUp = (req, res) => {
  const data = req.body
  console.log(req.body)
  // Checking all fields are included
  if (!data.libAdminName || !data.libAdminEmail || !data.libAdminPhone || !data.libraryName || !data.libraryEmail || !data.libraryPhone || !data.libraryAddress || !data.password) {
    return res.status(400).json({
      error: 'Please include all fields'
    })
  }

  console.log(req.body)
  const { hashSync } = bcrypt
  // console.log(req.body)
  const lib = new Library(req.body)
  // console.log(lib.password)
  lib.password = hashSync(req.body.password, 10)
  try {
    lib.save()
    res.json({
      lib,
      message: 'save successfully'
    })
  } catch (e) {
    return res.json({ e })
  }
}

export const libSignIn = async (req, res) => {
  try {
    const { sign } = jwt
    const { compareSync } = bcrypt

    // find User
    console.log(req.body)
    const user = await Library.findOne({ libraryEmail: req.body.email })
    console.log(user.libraryEmail)
    console.log(user.password)

    // Check password
    if (!compareSync(req.body.password, user.password)) {
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

export const libsignOut = (req, res) => {
  res.clearCookie('token')
  res.json({
    message: 'signout sucessfully'
  })
}

export const isLibAdminSignedIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth'
})

export const isLibAdminAuthenticated = (req, res, next) => {
  console.log('lib', req.libprofile._id)
  console.log('libauth', req.auth._id)
  const checker = req.libprofile._id == req.auth._id
  // console.log(checker)
  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED'
    })
  }
  next()
}

export const isLibAdmin = (req, res, next) => {
  if (!req.libprofile.role === 1) {
    return res.status(403).json({
      error: 'you are not Admin, access denied'
    })
  }
  next()
}
