const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize
const {checkPassword} = require('../helpers/hashPassword')
const jwt = require('jsonwebtoken')
const Op = sequelize.Sequelize.Op

let oldUser = {
    username: 'cakra',
    email: 'cakra@mail.com',
    password: 'cakra123'
}

let newUser = {
    username: 'hacktiv',
    email: 'hacktiv@mail.com',
    password: 'hacktiv123'
}

//for errorcases
let duplicatedUser = oldUser

let case1 = {
    username: 'case1',
    email: 'invalidformat',
    password: '1234567'
}

let case2 = {
    username: 'case2',
    email: 'email@mail.com',
    password: 'case2'
}

let case3 = {
    username: '',
    email: 'email@mail.com',
    password: '1234567'
}

let case4 = {
    username: null,
    email: 'email@mail.com',
    password: '1234567'
}

let case5 = {
    email: 'cakra@mail.com',
    password: 'cakra125'
}

let case6 = {
    email: 'adiel@mail.com',
    password: 'adiel123'    
}

describe('User Routes', () => {
    beforeAll(done => {
        User.create(oldUser)
        .then(result => {
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    afterAll(done => {
        queryInterface.bulkDelete('Users', {where: {id: {[Op.ne]:1}}})
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
    })


    //User Register : Success => 201, 'register success'
    describe('Successful Registration', () => {
        test(`returning json of message and token with status 201`, (done) => {
            request(app) 
            .post('/register')
            .send(newUser)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Register Success!')
                expect(response.body).toHaveProperty('access_token', expect.any(String))
                expect(response.status).toBe(201)
                done()
            })
        })
    })

    //User Register : Error => 400, 'user already exists'
    describe('Error Registration : Duplicated Email/Username', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
            .post('/register')
            .send(duplicatedUser)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Register Failed')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })    

    //User Register : Error => 400, 'invalid email format'
    describe('Error Registration : Invalid Email Format', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
            .post('/register')
            .send(case1)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Bad Request')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })   
    
    //User Register : Error => 400, `minimum password length is 6`
    describe('Error Registration : Minimum Password Length', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
            .post('/register')
            .send(case2)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Bad Request')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })    
    
    //User Register : Error => 400, `input can not be empty string`
    describe('Error Registration : Empty Input', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
            .post('/register')
            .send(case3)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Bad Request')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })  

    //User Register : Error => 400, `input can not be null`
    describe('Error Registration : Empty Input', () => {
        test(`returning json of error message with status 400`, (done) => {
            request(app)
            .post('/register')
            .send(case4)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Bad Request')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    }) 

    //User Login : Success => 200, 'login success'
    describe('Successful Login', () => {
        test(`returning json of message and token with status 200`, (done) => {
            request(app) 
            .post('/login')
            .send(oldUser)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Login Success!')
                expect(response.body).toHaveProperty('access_token', expect.any(String))
                expect(response.status).toBe(200)
                done()
            })
        })
    })    
    
    //User Login : Failed => 400, 'invalid username/password'
    describe('Failed Login, invalid username/password', () => {
        test(`returning json of message and token with status 400`, (done) => {
            request(app) 
            .post('/login')
            .send(case5)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Login Failed')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.status).toBe(400)
                done()
            })
        })
    })

    //User Login : Failed => 400, 'user does not exists'
    describe('Failed Login, user does not exists', () => {
        test(`returning json of message and token with status 400`, (done) => {
            request(app) 
            .post('/login')
            .send(case6)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'Login Failed')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.status).toBe(400)
                done()
            })
        })
    })    
})
