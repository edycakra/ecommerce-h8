const app = require('../app')
const http = require('http')
const server = http.createServer(app)
const PORT = process.env.PORT || 3000


//listening
server.listen(PORT, () => {
    console.log('connected at localhost:', PORT)
})