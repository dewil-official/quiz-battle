<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div v-if="auth.status == 'SUCCESS'">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div v-else>
        <LoginForm
          :userNames="userNames"
          v-on:loginButton="loginUser"
          :error="auth.error"
        />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import LoginForm from '@/components/pages/login/LoginForm.vue'

export default {
  components: {
    LoginForm,
  },
  mounted() {
    this.$socket.$subscribe('auth_success', (authToken) => {
      // 5 is just used here to avoid future updates destroying this.
      // I assume that the authToken will never be less than 6 chars long.
      if (authToken.length > 5) {
        this.$router.push('/game')
      }
    })
    this.$socket.client.emit('get_player_names')
  },
  computed: {
    auth() {
      return this.$store.state.auth
    },
    userNames() {
      return this.$store.state.auth.playerNames
    },
  },
  methods: {
    loginUser(authData) {
      this.$socket.client.emit('auth_data', authData)
    },
  },
}
</script>
