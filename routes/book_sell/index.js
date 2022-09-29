import express from 'express'
import {
  getBookById,
  getUserById,
  bookSell,
  getbookSellById,
  getbookSellOrder,
  returnSoldBook,
  getLibAdminById,
  getSellerSellOrderById,
  getUserOrderById,
  getUserAllOrderById,
  getSellerAllSellOrderById,
  isUserSignedIn,
  isUserAuthenticated,
  isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin
} from '../../controllers/index.js'

const router = express.Router()

// params
router.param('bookid', getBookById)
router.param('userid', getUserById)
router.param('libadminid', getLibAdminById)
router.param('sellid', getbookSellById)

// crete routes
router.post('/:bookid/:userid', isUserSignedIn, isUserAuthenticated, bookSell)
router.post('/return/:bookid/:userid/:sellid', isUserSignedIn, isUserAuthenticated, returnSoldBook)

// read routes
router.get('/:sellid', getbookSellOrder)
router.get('/:userid/:sellid', isUserSignedIn, isUserAuthenticated, getUserOrderById)
router.get('/library/:libadminid/:sellid', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, getSellerSellOrderById)
router.get('/user/order/:userid', isUserSignedIn, isUserAuthenticated, getUserAllOrderById)
router.get('/seller/order/:libadminid', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, getSellerAllSellOrderById)

export default router
