import express from 'express'

import {
  isLibAdminSignedIn, isLibAdminAuthenticated, getCatagoryById, getLibAdminById, isLibAdmin
} from '../../controllers/index.js'
import {
  createBook, deleteBook, getAllBooks, getBook, getBookById, updateBook
} from '../../controllers/book'
import path from 'path'
import multer from 'multer'

const router = express.Router()

export const imageUpload = multer({
  storage: multer.diskStorage({
    // Destination to store image
    destination: 'public/images',
    filename: (req, file, cb) => {
      // console.log(req.file)
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
  }),
  limits: {
    fileSize: 100000000 // 1000000 Bytes = 1 MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'))
    }
    cb(undefined, true)
  }
})

// params
// router.param('adminId', getUserById)
router.param('libadminId', getLibAdminById)
router.param('categoryid', getCatagoryById)
router.param('bookid', getBookById)

// createroutes
router.post('/create/:libadminId', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, imageUpload.array('bookPhotos', 10), createBook)

// readroutes
router.get('/:bookid', getBook)
router.get('/', getAllBooks)

// updateroutes
router.put('/update/:bookid/:libadminId', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, imageUpload.array('bookPhotos', 10), updateBook)

// deleteroutes
router.delete('/delete/:bookid/:libadminId', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, deleteBook)

export default router
