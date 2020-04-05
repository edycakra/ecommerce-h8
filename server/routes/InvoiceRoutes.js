const router = require('express').Router()
const InvoiceController = require('../controllers/InvoiceController')
const {authentication} = require('../middlewares/auth')

router.use(authentication)

router.post('/', InvoiceController.checkOut)
router.get('/', InvoiceController.findAll)

module.exports = router