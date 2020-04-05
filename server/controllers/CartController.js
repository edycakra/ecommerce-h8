const {Cart, Product} = require('../models')

class CartController {
    static findCart(req, res, next) {
        let UserId = +req.decoded.id
        Cart.findAll({where: {UserId, isActive: true}, include: [Product]})
        .then(cart => {
            if (cart) {
                res.status(200).json({cart})
            } else {
                next({
                    status: 404,
                    name: 'Not Found',
                    message: 'cart does not exists'
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static updateCart(req, res, next) {
        let UserId = +req.decoded.id
        const payload = {
            UserId,
            ProductId: +req.body.ProductId,
            quantity: +req.body.quantity,
            isActive: true
        }      
        Cart.findOne({where: {UserId, isActive: true}})
        .then(cart => {
            if(!cart) {
                Cart.create(payload)
                .then(cart => {
                    res.status(201).json({cart})
                })
                .catch(err => {
                    next(err)
                })
            } else {        
                if (cart.ProductId == payload.ProductId) {
                    Cart.update(payload, {where: {UserId}, include: [Product], returning: true})
                    .then(cart => {
                        res.status(200).json({cart})
                    })
                    .catch(err => {
                        next(err)
                    })                    
                } else {
                    return Product.findOne({where: {id:+req.body.ProductId}})
                    .then(product => {
                        if (product) {
                            Cart.create(payload)
                            .then(cart => {
                                res.status(200).json({cart})
                            })
                            .catch(err => {
                                next(err)
                            })
                        } else {
                            next({
                                status: 404,
                                name: 'Not Found',
                                message: 'product does not exists'
                            })
                        }
                    })

                }

            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteCart(req, res, next) {
        let ProductId = +req.params.ProductId
        Cart.destroy({where: {ProductId}})
        .then(cart => {
            if (cart) {
                res.status(200).json({
                    message: `Cart contained a product with ID ${ProductId} is deleted`
                })
            } else {
                next({
                    status: 404,
                    name: `Not Found`,
                    message: `Cart contained a product with ID ${ProductId} does not exists`
                })                  
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CartController