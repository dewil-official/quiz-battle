<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title v-if="auth.status == 'none'"
          >Work in Progress.</v-card-title
        >
        <v-card-title v-if="auth.status == 'success'">
          {{ auth.token }}
        </v-card-title>
        <v-card-title v-if="auth.status == 'error'">
          {{ auth.error }}
        </v-card-title>
        <v-card-actions v-if="auth.status != 'success'">
          <v-btn color="orange" @click="testLogin" text>Test Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.state.auth
    },
  },
  methods: {
    testLogin() {
      this.$socket.client.emit('auth_data', {
        name: 'GameMaster',
        password: 'GameMaster',
      })
    },
  },
}
</script>
