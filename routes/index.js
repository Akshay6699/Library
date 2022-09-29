import express from 'express'
import userRoute from './user'
import adminRoute from './admin'
import merchantRoute from './merchant'
import healthRoute from './health'
import bookCategoryRoute from './book_category'
import libraryRoute from './library'
import bookRoute from './book'
import bookRent from './book_rent'
import bookSell from './book_sell'
import bookSellRequest from './book_Request'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'PlanetX DGT Blockchain Backend Server' })
})

router.use('/user', userRoute)
router.use('/admin', adminRoute)
router.use('/merchant', merchantRoute)
router.use('/health', healthRoute)
router.use('/admin/category', bookCategoryRoute)
router.use('/library', libraryRoute)
router.use('/book', bookRoute)
router.use('/user/book', bookRent)
router.use('/user/book/sell', bookSell)
router.use('/library/request', bookSellRequest)

export default router
