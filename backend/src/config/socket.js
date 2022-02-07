const server = require('../server');

const socketListener = async () => {
  const io = await require('socket.io')(server, {
    cors:{
      origin: 'http://localhost:4200/',
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
      allowEIO3: true,
  },
    path: "/socket-io",
    perMessageDeflate: false,
  });
  return await io.on('connection', async (socket) => {
    console.log('socket connected')

    socket.on("payment", (data) => {
      // console.log(data);
      io.emit("payment",data.bill);
    })
    socket.on('disconnect', () => {
      console.log('socket disconnected!');
      socket.disconnect();
      socket.removeAllListeners();
    });
  });
  
};

module.exports = socketListener;