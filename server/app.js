const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

/* прослушиваем подключение сокетов */
io.on('connection', socket => {
  console.log('IO Connected')

  socket.on('createMessage', data => {
    setTimeout(()=> {
      socket.emit('newMessage', {
        text: data.text + 'SERVER'
      })
    }, 500)
  })

  socket.emit('newMessage', {text: 'emitted from server/app'})
})

module.exports = {
  app, server
}
