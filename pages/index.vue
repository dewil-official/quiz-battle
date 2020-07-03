<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title v-if="!authToken && !authError">Work in Progress.</v-card-title>
        <v-card-title v-if="authToken">{{ authToken }}</v-card-title>
        <v-card-title v-if="authError">{{ authError }}</v-card-title>
        <v-card-actions v-if="!authToken">
          <v-btn color="orange" @click="testLogin" text>Test Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import socket from '~/plugins/socket.io'
import { LoginToken } from '../types/socketInterfaces'

export default {
  data() {
    return { authToken: '', authError: '' }
  },
  beforeMount() {
    socket.on('auth-success', (authToken: LoginToken) => {
      console.log('Received Success')
      this.authToken = authToken.token
    })
    socket.on('auth-error', (authError: any) => {
      console.log('Received Error')
      this.authError = authError
    })
  },
  methods: {
    testLogin() {
      socket.emit('auth-login', {
        name: 'GameMaster',
        password: 'Gamemaster',
      })
    },
  },
}
</script>
