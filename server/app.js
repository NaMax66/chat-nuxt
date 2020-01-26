const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const m = (name, text, id) => ({name, text, id})

/* прослушиваем подключение сокетов */
io.on('connection', socket => {
  console.log('IO Connected')
  /* слушаем емит с сервера */
  /* cb - это колбек который приходит с клиента */
  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('данные некорректны')
    }
    socket.join(data.room)
    cb({ userId: socket.id })
    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}`))
    socket.emit('newMessage', m('TEST', `Добро пожаловать ${data.name}`))
    /* broadcast Отправляет сообщения всем кроме текущего пользователя */
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `пользователь ${data.name} зашел.`))
  })

  socket.on('createMessage', data => {
    setTimeout(()=> {
      socket.emit('newMessage', {
        text: data.text
      })
    }, 500)
  })

  // socket.emit('newMessage', {text: 'emitted from server/app'})
})

module.exports = {
  app, server
}
