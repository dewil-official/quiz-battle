<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div v-if="auth.status == 'SUCCESS'">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-else>
        <LoginForm :userNames="userNames" v-on:loginButton="loginUser" :error="auth.error" />
      </div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoginData from '../types/user/loginData'
import LoginForm from '~/components/pages/login/LoginForm.vue'

@Component({
  components: { LoginForm },
})
export default class IndexPage extends Vue {
  get auth() {
    return this.$store.state.auth
  }

  get userNames() {
    return this.$store.state.auth.playerNames
  }

  loginUser(loginData: LoginData) {
    console.log('Received loginButton from index.vue')
    this.$socket.client.emit('login', loginData)
  }

  mounted() {
    this.$socket.$subscribe('login_success', (authToken: string) => {
      // 5 is just used here to avoid future updates destroying this.
      // I assume that the authToken will never be less than 6 chars long.
      if (authToken.length > 5) {
        this.$router.push('/game')
      }
    })
    this.$socket.client.emit('get_player_names')
  }
}
</script>
