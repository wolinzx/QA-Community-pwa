var socketIo = require('socket.io')
var socketio = {}
// 获取io
socketio.getSocketio = function (server) { // http(s) server
  var io = socketIo.listen(server)
  io.sockets.on('connection', function (socket) {
    // socket.join('room 237', () => {
    //   let rooms = Object.keys(socket.rooms)
    //   console.log(rooms) // [ <socket.id>, 'room 237' ]
    // })
    socket.on('hhh', function () {
      // socket.emit('mmm', { datas: '22262' }) // 给该客户端发送event02事件
      socket.broadcast.to('room 237').emit('mmm', 'nice game')
    })
    // 更多事件，就更多处理函数

    // ......
  })
}

module.exports = socketio
