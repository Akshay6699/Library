import express from 'express'
import {
  getBookById,
  getCatagoryById,
  getLibAdminById,
  getAdminById,
  isSignedIn,
  isAuthenticated, isAdmin, getUserById,
  getAdmin,
  getAllAdmin, getAllBook,
  getAlllib,
  getAllUser, getBook,
  getlib,
  getUser
} from '../../controllers/index.js'

const router = express.Router()

// params
router.param('adminId', getAdminById)
router.param('userid', getUserById)
router.param('categoryid', getCatagoryById)
router.param('libadminId', getLibAdminById)
router.param('categoryid', getCatagoryById)
router.param('bookid', getBookById)

// user access
router.get('/user/:userid/:adminId', isSignedIn, isAuthenticated, isAdmin, getUser)
router.get('/user/:adminId', isSignedIn, isAuthenticated, isAdmin, getAllUser)
router.get('/lib/:libadminId/:adminId', isSignedIn, isAuthenticated, isAdmin, getlib)
router.get('/lib/:adminId', isSignedIn, isAuthenticated, isAdmin, getAlllib)
router.get('/:adminId', isSignedIn, isAuthenticated, isAdmin, getAllAdmin)
router.get('/:adminId', isSignedIn, isAuthenticated, isAdmin, getAdmin)
router.get('/book/:bookid/:adminId', isSignedIn, isAuthenticated, isAdmin, getBook)
router.get('/book/:adminId', isSignedIn, isAuthenticated, isAdmin, getAllBook)

export default router
