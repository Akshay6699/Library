import express from 'express'
import { imageUpload } from '../book/index.js'
import {
  getBookById, getLibAdminById, getLibraryAllBooks, getLibraryBook,
  getLibreryBookByAuthor, getLibreryBookByCategory,
  getLibreryBookByName, getLibreryBookByPrice,
  getLibreryBookByPublisher, libSignUp, libSignIn, isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin
} from '../../controllers/index.js'
const router = express.Router()

// params
router.param('bookid', getBookById)
router.param('libadminId', getLibAdminById)

router.post('/signup', imageUpload.array('bookPhotos', 10), libSignUp)
router.post('/signIn', libSignIn)

// read routes
router.get('/name/:libadminId', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, getLibreryBookByName)
router.get('/category/:libadminId', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, getLibreryBookByCategory)
router.get('/Authoer/:libadminId', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, getLibreryBookByAuthor)
router.get('/publisher/:libadminId', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, getLibreryBookByPublisher)
router.get('/price/:libadminId', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, getLibreryBookByPrice)
router.get('/:libadminId', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, getLibraryAllBooks)
router.get('/book/:bookid/:libadminId', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, getLibraryBook)

export default router
