const express = require('express')
const router = express.Router()
const UserRoutes = require('./UserRoutes')
const ProductRoutes = require('./ProductRoutes')
const CartRoutes = require('./CartRoutes')
const InvoiceRoutes = require('./InvoiceRoutes')

router.use('/', UserRoutes)
router.use('/products', ProductRoutes)
router.use('/carts', CartRoutes)
router.use('/invoices', InvoiceRoutes)

module.exports = router