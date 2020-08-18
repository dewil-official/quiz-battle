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
import LoginData from '~/types/interfaces/auth/loginData'
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

  loginUser(authData: LoginData) {
    this.$socket.client.emit('auth_data', authData)
  }

  mounted() {
    this.$socket.$subscribe('auth_success', (authToken: string) => {
      // 5 is just used here to avoid future updates destroying this.
      // I assume that the authToken will never be less than 6 chars long.
      if (authToken.length > 5) {
        this.$router.push('/game')
      }
    })
    if (this.auth.token) {
      this.$router.push('/game')
    } else {
      this.$socket.client.emit('get_player_names')
    }
  }
}
</script>
