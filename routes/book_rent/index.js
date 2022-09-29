import express from 'express'
import {
  bookRent,
  bookReturn,
  getAllRentedBookByLibAdmin, getAllRentedBookByUser,
  getBookById, getbookRent,
  getbookRentById, getLibAdminById, getRentedBookByNameForLidAdmin, getRentedBookByNameForUser,
  getUserById, isLibAdmin, isLibAdminAuthenticated, isLibAdminSignedIn, isUserAuthenticated, isUserSignedIn
} from '../../controllers/index.js'

const router = express.Router()

// params
router.param('bookid', getBookById)
router.param('userid', getUserById)
router.param('rentid', getbookRentById)
router.param('libadminid', getLibAdminById)

// crete routes
router.post('/rent/:bookid/:userid', bookRent)
router.post('/return/:bookid/:userid/:rentid', bookReturn)

// read routes
router.get('/rent/:rentid', getbookRent)
router.get('/library/rent/:libadminid', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, getAllRentedBookByLibAdmin)
router.get('/library/rent/name/:libadminid', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, getRentedBookByNameForLidAdmin)
router.get('/rent/book/:userid', isUserSignedIn, isUserAuthenticated, getAllRentedBookByUser)
router.get('/rent/book/name/:userid', isUserSignedIn, isUserAuthenticated, getRentedBookByNameForUser)

export default router
