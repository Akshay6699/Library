import express from 'express'
import {
  createCategory, deleteCategory,
  getAllCategory,
  getCatagoryById,
  getCategory,
  updateCategory
} from '../../controllers/book_category/index.js'
import { isAdmin, isAuthenticated, isSignedIn, getAdminById } from '../../controllers/index.js'

const router = express.Router()

// params
router.param('adminId', getAdminById)
router.param('categoryid', getCatagoryById)

// readroutes
router.get('/:categoryid', getCategory)
router.get('/all/category', getAllCategory)

// createroutes
router.post('/create/:adminId', isSignedIn, isAuthenticated, isAdmin, createCategory)

// updateroutes
router.put('/update/:categoryid/:adminId', isSignedIn, isAuthenticated, isAdmin, updateCategory)

// deleteroutes
router.delete('/delete/:categoryid/:adminId', isSignedIn, isAuthenticated, isAdmin, deleteCategory)

export default router
