<template>
  <v-app>
    <v-app-bar absolute color="transparent" flat fixed app>
      <v-toolbar-title>Quiz Battle ⚡</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom v-if="isLoggedIn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="logOut">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Log Out!</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <span>&copy; DeWil</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DefaultLayout extends Vue {
  get isLoggedIn(): boolean {
    return this.$store.getters['auth/isLoggedIn']
  }

  get authToken(): string {
    return this.$store.state.auth.token
  }

  logOut() {
    this.$socket.client.emit('log_out', this.authToken)
    this.$router.replace('/')
  }
}
</script>
