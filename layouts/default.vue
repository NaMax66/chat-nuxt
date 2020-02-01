<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer">
      <v-list subheader>
        <v-subheader>Users in room</v-subheader>

        <v-list-item
          v-for="item in users"
          :key="item.id"
          @click.prevent=""
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="item.id === user.id ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
    <v-toolbar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Чат комнаты: {{ user.room }}</v-toolbar-title>
    </v-toolbar>
      <div style="height: calc(100% - 56px)">
        <nuxt></nuxt>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import { mapState, mapMutations } from "vuex"

  export default {
    data: () => ({
      drawer: true
    }),
    computed: mapState(["user", "users"]),
    methods: {
      ...mapMutations(['clearData']),
      exit () {
        this.$socket.emit('userLeft', this.user.id, () => {
          this.$router.push('/?message=leftChat')
          this.clearData()
        })
      }
    }
  }
</script>
