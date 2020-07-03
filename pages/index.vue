<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title v-if="!authToken">Work in Progress.</v-card-title>
        <v-card-title v-if="!authToken && authError">
          {{ authError }}
        </v-card-title>
        <v-card-title v-else>{{ authToken }}</v-card-title>
        <v-card-actions v-if="!authToken">
          <v-btn color="orange" @click="testLogin" text>Test Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import socket from '~/plugins/socket.io'

export default {
  data() {
    return { authToken: '', authError: '' }
  },
  beforeMount() {
    socket.on('auth-success', (authToken) => {
      console.log('Received Success')
      this.authToken = authToken
    })
    socket.on('auth-error', (authError) => {
      console.log('Received Error')
      this.authError = authError
    })
  },
  methods: {
    testLogin() {
      socket.emit('auth-login', {
        name: 'GameMaster',
        password: 'GameMaster',
      })
    },
  },
}
</script>
