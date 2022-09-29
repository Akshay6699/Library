import express from 'express'
import {
  booSellRequest, getLibAdminById,
  getSellRequestById, isLibAdmin,
  isLibAdminAuthenticated,
  isLibAdminSignedIn
} from '../../controllers/index.js'

const router = express.Router()

// params
router.param('requestid', getSellRequestById)
router.param('libadminid', getLibAdminById)

router.get('/:requestid/:libadminid', isLibAdminSignedIn, isLibAdminAuthenticated, isLibAdmin, booSellRequest)

export default router
