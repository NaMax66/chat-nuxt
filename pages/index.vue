<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card>
        <v-card-title><h1>Nuxt chat</h1></v-card-title>
        <v-card-text>
          <form>
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
              v-model="rooms"
              :error-messages="roomsErrors"
              label="Room name"
              required
              @input="$v.rooms.$touch()"
              @blur="$v.rooms.$touch()"
            ></v-text-field>
            <v-select
              v-model="select"
              :items="items"
              :error-messages="selectErrors"
              label="Item"
              required
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
            ></v-select>
            <v-checkbox
              v-model="checkbox"
              :error-messages="checkboxErrors"
              label="Do you agree?"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            ></v-checkbox>

            <v-btn class="mr-4" @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { validationMixin } from "vuelidate"
  import { required, maxLength, minLength } from "vuelidate/lib/validators"

  export default {
    layout: "empty",
    sockets: {
      connect() {
        console.log("Client IO connected")
      }
    },
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      rooms: { required, minLength: minLength(4) },
      select: { required },
      checkbox: {
        checked(val) {
          return val
        }
      }
    },

    data: () => ({
      name: "",
      rooms: "",
      select: null,
      checkbox: false
    }),

    computed: {
      checkboxErrors() {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push("You must agree to continue!")
        return errors
      },
      selectErrors() {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push("Item is required")
        return errors
      },
      nameErrors() {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push("Name must be at most 10 characters long")
        !this.$v.name.required && errors.push("Name is required.")
        return errors
      },
      roomsErrors() {
        const errors = []
        if (!this.$v.rooms.$dirty) return errors
        !this.$v.rooms.minLength && errors.push("Should be more than 4 chars")
        !this.$v.rooms.required && errors.push("The room name is required.")
        return errors
      }
    },

    methods: {
      submit() {
        this.$v.$touch()
      },
      clear() {
        this.$v.$reset()
        this.name = ""
        this.email = ""
        this.select = null
        this.checkbox = false
      }
    }
  }
</script>
