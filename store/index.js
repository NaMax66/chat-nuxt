export const state = () => ({
  user: {},
  messages: []
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  clearData(state) {
    state.user = {}
    state.messages = []
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message)
  }
}

// не нужно после добавления этой логики в mutations
/*export const actions = {
  SOCKET_newMessage(ctx, data) {
    console.log('Message received!', data)
  }
}*/
