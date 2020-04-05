const { User } = require('../models')
const { checkPassword } = require('../helpers/hashPassword')
const jwt = require('jsonwebtoken')

class UserController {
    static register (req, res, next) {
        let {username, email, password} = req.body
        let newUser = {username, email, password}
        User.findOne({where: ({email} || {username})})
        .then(user => {
            if(user) {
                next({
                    status: 400,
                    name: 'Register Failed',
                    message: 'user already exists!'
                  })
            } else {
                User.create(newUser)
                .then(newUser => {
                    let payload = {
                        id: newUser.id,
                        username: newUser.username,
                        email: newUser.email,
                        isAdmin: newUser.isAdmin
                    }
                    let access_token = jwt.sign(payload, `${process.env.SECRET}`)
                    res.status(201).json({
                        message: 'Register Success!',
                        username: newUser.username,
                        isAdmin: newUser.isAdmin,
                        access_token
                    })
                })
                .catch(err => {
                    next(err)
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {
        let {email, password} = req.body
        User.findOne({where: {email}})
        .then(user => {
            if (user) {
                if (checkPassword(password, user.password)) {
                    let payload = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                    let access_token = jwt.sign(payload, `${process.env.SECRET}`)
                    res.status(200).json({
                        message: 'Login Success!',
                        isAdmin: user.isAdmin,
                        username: user.username,
                        access_token
                    })
                } else {
                    next({
                        status: 400,
                        name: 'Login Failed',
                        message: 'invalid username/password!'                        
                    })
                }
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
}

module.exports = UserController