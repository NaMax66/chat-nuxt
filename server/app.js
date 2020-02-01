const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

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
    /* чтобы небыло ошибок - удаляем пользователя из списка */
    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })
    /* присваиваем id пользователю и отправляем на клиент */
    cb({ userId: socket.id })
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}`))
    /* broadcast Отправляет сообщения всем кроме текущего пользователя */
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `пользователь ${data.name} зашел.`))
  })

  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      return cb('Текст не может быть пустым')
    }
    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, user.id))
    }
    cb()
  })

  socket.on('userLeft', (id, cb) => {
    const user = users.remove(id)
    if (id) {
      io.to(user.room).emit('newMessage', m('admin', `Пользователь ${user.name} вышел.`))
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
    }
    /* cb вызываем в любом случае */
    cb()
  })
  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    console.log(users)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', m('admin', `Пользователь ${user.name} отключился`))
    }
  })
})

module.exports = {
  app, server
}
