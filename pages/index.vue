<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title v-if="authState.status == ''"
          >Work in Progress.</v-card-title
        >
        <v-card-title v-if="authState.status == 'success'">{{
          authToken
        }}</v-card-title>
        <v-card-title v-if="authState.status == 'error'">{{
          authErrorMsg
        }}</v-card-title>
        <v-card-actions v-if="authState.status != 'success'">
          <v-btn color="orange" @click="testLogin" text>Test Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { AuthError, AuthToken } from '../types/networking/auth'
import { AuthState } from '../types/state/authState'
import { PlayerState } from '../types/state/playerState'
import { Socket } from 'vue-socket.io-extended'
import Vue from 'vue'
import { State } from 'vuex-class'

import Component from 'vue-class-component'

//const AuthState = Object.freeze({ none: 1, success: 2, error: 3 })

@Component
export default class extends Vue {
  @State auth!: AuthState
  @State players!: PlayerState

  // computed: {
  //   authState(): AuthState {
  //     return this.$store.state.auth
  //   },
  // },
  // sockets: {
  //   connect() {
  //     console.log('socket connected')
  //   },
  // },
  // created() {
  //   socket.on('auth-success', (authToken: AuthToken) => {
  //     this.authToken = authToken.token
  //     this.authState = AuthState.success
  //   })
  //   socket.on('auth-error', (authError: AuthError) => {
  //     try {
  //       this.authErrorMsg = authError.message
  //       this.authState = AuthState.error
  //     } catch (e) {
  //       this.authErrorMsg = 'Unknown Error.'
  //       this.authState = AuthState.error
  //     }
  //   })
  // },
  // methods: {
  //   testLogin() {
  //     this.$socket.client.emit('auth-login', {
  //       name: 'GameMaster',
  //       password: 'GameMaster',
  //     })
  //     // socket.emit('auth-login', {
  //     //   name: 'GameMaster',
  //     //   password: 'Gamemaster',
  //     // })
  //   },
  // },
}
</script>
