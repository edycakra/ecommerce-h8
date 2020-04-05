const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')
const Op = sequelize.Sequelize.Op


let access_token = `${process.env.ADMINTOKEN}`
let wrong_token = `abcde`

let productTest = {
    name: 'test',
    image_url: 'https://cdn.hipwallpaper.com/i/2/14/xPVXd2.jpg',
    price: 200000,
    stock: 2
}

let case7 = {
    name: '',
    image_url: 'https://cdn.hipwallpaper.com/i/2/14/xPVXd2.jpg',
    price: 200000,
    stock: 2
}

let case8 = {
    name: null,
    image_url: 'https://cdn.hipwallpaper.com/i/2/14/xPVXd2.jpg',
    price: 200000,
    stock: 2
}

let case9 = {
    name: 'test',
    image_url: 'https://cdn.hipwallpaper.com/i/2/14/xPVXd2.jpg',
    price: 0,
    stock: 2
}

let case10 = {
    name: 'test',
    image_url: 'https://cdn.hipwallpaper.com/i/2/14/xPVXd2.jpg',
    price: 200000,
    stock: 'abc'
}


describe('Product Routes', () => {
 

    beforeAll((done) => {
        queryInterface.bulkDelete('Users', {})
          .then(response => {
            done()
          }).catch(err => done(err))
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
    afterAll(done => {
        queryInterface.bulkDelete('Products', null, {})
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    //FINDALL PRODUCT : success
    describe(`Successful Find All Products`, () => {
        test(`returning json of all data with status 200`, (done) => {
            request(app)
            .get('/products')
            .set('access_token', access_token)
            .send(productTest)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('products', expect.any(Array))
                expect(response.status).toBe(200)
                done()
            })
        })
    })    

    // FINDONE PRODUCT: FAILED
    describe(`Failed Find One Product`, () => {
        test(`returning json of error with status 400`, (done) => {
            request(app)
            .get(`/products/${200}`)
            .set('access_token', access_token)
            .send(productTest)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.status).toBe(400)
                done()
            })
        })
    }) 

    // //CREATE PRODUCT: SUCCESS
    // describe(`Successful Add New Product`, () => {
    //     test(`returning json of new data with status 201`, (done) => {
    //         request(app)
    //         .post('/products')
    //         .set('access_token', access_token)
    //         .send(productTest)
    //         .end((err, response) => {
    //             expect(err).toBe(null)
    //             expect(response.body).toHaveProperty('newProduct', expect.any(Object))
    //             expect(response.status).toBe(201)
    //             done()
    //         })
    //     })
    // })    

    //CREATE PRODUCT: ERROR -> empty string input
    describe(`Error add new product: empty input`, () => {
        test(`returning json of error with status 400`, (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(case7)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })
    //CREATE PRODUCT: ERROR -> null input
    describe(`Error add new product: null input`, () => {
        test(`returning json of error with status 400`, (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(case8)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })
    //CREATE PRODUCT: ERROR -> less than 0
    describe(`Error add new product: less than 0`, () => {
        test(`returning json of error with status 400`, (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(case9)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })
    //CREATE PRODUCT: ERROR -> not numeric
    describe(`Error add new product: not numeric`, () => {
        test(`returning json of error with status 400`, (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(case10)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })

    //CREATE PRODUCT: ERROR -> not authorized
    describe(`Error add new product: not authorized`, () => {
        test(`returning json of error with status 400`, (done) => {
            request(app)
            .post('/products')
            .set('access_token', wrong_token)
            .send(productTest)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('message', 'JsonWebTokenError')
                expect(response.body).toHaveProperty('errors', expect.any(Array))
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })
    
    //UPDATE PRODUCT: ERROR -> id does not exists
    describe(`Error update product`, () => {
        test(`returning json of error with status 404`, (done) => {
            request(app)
            .post(`/products/${200}`)
            .set('access_token', access_token)
            .send(productTest)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })

    //DELETE PRODUCT: ERROR -> id does not exists
    describe(`Error delete  product`, () => {
        test(`returning json of error with status 404`, (done) => {
            request(app)
            .post(`/products/${200}`)
            .set('access_token', access_token)
            .send(productTest)
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body.status).toBe(400)
                done()
            })
        })
    })
})
