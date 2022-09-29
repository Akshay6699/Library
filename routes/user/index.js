import express from 'express'
import { check } from 'express-validator'
import {
  signUp, signOut, signIn, getUserById,
  getAdminById,
  getBookByAuthor,
  getBookByCategory, getBookByName, getBookByPrice, getBookByPublisher, isUserSignedIn, isUserAuthenticated
} from '../../controllers'

const router = express.Router()

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource')
// })

// router
router.param('adminId', getAdminById)
router.param('userid', getUserById)

router.post('/sigup',
  [
    check('firstname', 'name is must be at least 3 character').isLength({ min: 3 }),
    check('lastname', 'last name is must be at least 3 character').isLength({ min: 3 }),
    check('email', 'email is require').isEmail(),
    check('phoneNumber', 'phone number is must have 10 number').isNumeric().isLength({
      min: 10,
      max: 10
    }),
    check('password', 'passwrod have must at least 7 character in it').isLength({ min: 7 })
  ],
  signUp)

router.post('/sigin',
  [
    check('email', 'email is require').isEmail(),
    check('password', 'passwrod have must at least 7 character in it').isLength({ min: 7 })
  ],
  signIn)

router.get('/signout', signOut)

// read routes
router.get('/name/:userid', isUserSignedIn, isUserAuthenticated, getBookByName)
router.get('/category/:userid', isUserSignedIn, isUserAuthenticated, getBookByCategory)
router.get('/Authoer/:userid', isUserSignedIn, isUserAuthenticated, getBookByAuthor)
router.get('/publisher/:userid', isUserSignedIn, isUserAuthenticated, getBookByPublisher)
router.get('/price/:userid', isUserSignedIn, isUserAuthenticated, getBookByPrice)

export default router
