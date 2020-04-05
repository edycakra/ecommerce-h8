const router = require('express').Router()
const CartController = require('../controllers/CartController')
const {authentication} = require('../middlewares/auth')
const {customerAuthorization} = require('../middlewares/auth')

router.use(authentication)
router.use(customerAuthorization)

router.get('/', CartController.findCart)
router.post('/', CartController.updateCart)
router.delete('/:ProductId', CartController.deleteCart)

module.exports = router