const {User} = require('../models')
const {Product} =require('../models')
const jwt = require('jsonwebtoken')

authentication = (req, res, next) => {
    let decoded = jwt.verify(req.headers.access_token, `${process.env.SECRET}`)
    User.findOne({where: {id: decoded.id}})
    .then(user => {
        if(user) {
            req.decoded = decoded
            next()
        } else {
            next({
                status: 400,
                name: 'Login Failed',
                message: 'user does not exists'
            })
        }
    })
    .catch(err => {
        next(err)
    })
}

adminAuthorization = (req, res, next) => {
    let id
    if (req.params.id) {
        id = +req.params.id
        Product.findOne({where: {id}})
        .then(product => {
            if (product) {
                if (req.decoded.isAdmin) {
                    next()
                } else {
                    next({
                        status: 401,
                        name: 'Not Authorized',
                        message: 'you are not authorized'
                    })
                }
            } else {
                next({
                    status: 404,
                    name: 'Not Found',
                    message: 'product does not exists'
                })
            }
        })
        .catch(err => {
            next(err)
        })
    } else {
        if (req.decoded.isAdmin) {
            next()
        } else {
            next({
                status: 401,
                name: 'Not Authorized',
                message: 'you are not authorized'
            })            
        }
    }
}

customerAuthorization = (req, res, next) => {
    let id
    if (req.params.id) {
        id = +req.params.id
        Product.findOne({where: {id}})
        .then(product => {
            if (product) {
                if (!req.decoded.isAdmin) {
                    next()
                } else {
                    next({
                        status: 401,
                        name: 'Not Authorized',
                        message: 'you are not authorized'
                    })
                }
            } else {
                next({
                    status: 404,
                    name: 'Not Found',
                    message: 'product does not exists'
                })
            }
        })
        .catch(err => {
            next(err)
        })
    } else {
        if (!req.decoded.isAdmin) {
            next()
        } else {
            next({
                status: 401,
                name: 'Not Authorized',
                message: 'you are not authorized'
            })            
        }
    }
}

module.exports = { authentication, adminAuthorization, customerAuthorization}