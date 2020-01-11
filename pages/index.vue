<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400">
        <v-card-title><h1>Nuxt chat</h1></v-card-title>
        <v-card-text>
          <v-form ref='form' v-model="valid">
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :counter="10"
              label="Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="room"
              :error-messages="roomErrors"
              label="Room name"
              required
              @input="$v.room.$touch()"
              @blur="$v.room.$touch()"
            ></v-text-field>
            <v-btn class="mr-4" color="primary" :disabled="!valid" @click="submit">Enter</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { validationMixin } from "vuelidate"
  import { required, maxLength, minLength } from "vuelidate/lib/validators"
  import { mapMutations } from 'vuex'

  export default {
    /* Определяет содержимое тега head */
    head: {
      title: 'Welcome to Nuxt Chat!'
    },
    layout: "empty",
    sockets: {
      connect() {
        console.log("Client IO connected")
      }
    },
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      room: { required, minLength: minLength(4) }
    },

    data: () => ({
      name: "",
      room: "",
      valid: false
    }),

    computed: {
      nameErrors() {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push("Name must be at most 10 characters long")
        !this.$v.name.required && errors.push("Name is required.")
        return errors
      },
      roomErrors() {
        const errors = []
        if (!this.$v.room.$dirty) return errors
        !this.$v.room.minLength && errors.push("Should be more than 4 chars")
        !this.$v.room.required && errors.push("The room name is required.")
        return errors
      }
    },

    methods: {
      ...mapMutations(['setUser']),
      submit() {
        this.$v.$touch()
        const user = {
          name: this.name,
          room: this.room
        }
        /* вызываем мутацию */
        this.setUser(user)

        /* открываем страницу чат */
        this.$router.push('/chat')
      },
      clear() {
        this.$v.$reset()
        this.name = ""
        this.room = ""
      }
    }
  }
</script>
