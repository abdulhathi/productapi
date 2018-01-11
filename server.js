const http = require('http');
const App = require('./app');

const port = process.env.port || 8080;

const server = http.createServer(App);

server.listen(port);
