const { Product } = require('../models')

class ProductController {
    static findAll(req, res, next) {
        Product.findAll()
        .then(products => {
            res.status(200).json({products})
        })
        .catch(err => {
            next(err)
        })
    }

    static findOne(req, res, next) {
        let id = +req.params.id
        Product.findByPk(id)
        .then(product => {
            if (product) {
                res.status(200).json({product})
            } else {
                next({
                    status: 400,
                    name: 'Not Found',
                    message: `Product with id ${id} does not exists`
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static create(req, res, next) {
        const newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }
        Product.create(newProduct)
        .then(newProduct => {
            res.status(201).json({newProduct})
        })
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next) {
        let id = +req.params.id
        let payload = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }
        Product.update(payload, {
            where: {id},
            returning: true
        })
        .then(product => {
            if (product[1].length) {
                res.status(200).json({product})
            } else {
                next({
                    status: 404,
                    name: `Not Found`,
                    message: `Product with id ${id} does not exists`
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static delete (req, res, next) {
        let id = +req.params.id
        
        Product.destroy({where: {id}})
        .then(product => {
            if (product) {
                res.status(200).json({
                    message: `Product with id ${id} is deleted`
                })
            } else {
                next({
                    status: 404,
                    name: `Not Found`,
                    message: `Product with id ${id} does not exists`
                })                
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController