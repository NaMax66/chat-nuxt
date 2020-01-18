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
            <v-icon :color="item.id === 2 ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
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
      <div>
        <nuxt></nuxt>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  import { mapState, mapMutations } from "vuex"

  export default {
    data: () => ({
      drawer: true,
      users:[
        { id: 1, name: 'User 1'},
        { id: 2, name: 'User 2'}
      ]
    }),
    computed: mapState(["user"]),
    methods: {
      ...mapMutations(['clearData']),
      exit () {
        this.$router.push('/?message=leftChat')
        this.clearData()
      }
    }
  }
</script>
