const dotenv = require('dotenv')
dotenv.config()

const http = require('http');

const app = require('./app');
const Port = process.env.Port || 4343;

const server = http.createServer(app);

server.listen(Port, (req, res)=> {
    console.log(`Server Connecting to Port: ${Port}`)
})
