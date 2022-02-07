const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port, async () => {
  const socket = require('./config/socket');

  //socketListener
  app.use(socket)
  console.log(`App listening at http://localhost:${port}`);
});


module.exports = server;
