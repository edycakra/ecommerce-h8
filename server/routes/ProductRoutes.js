const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const {authentication} = require('../middlewares/auth')
const {adminAuthorization} = require('../middlewares/auth')

router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)

router.use(authentication)
router.use(adminAuthorization)

router.post('/', ProductController.create)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router