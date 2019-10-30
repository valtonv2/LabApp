const http = require('http')
const app = require('./App')
const config = require('./utils/config')

const server = http.createServer(app)

const PORT = config.PORT

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})