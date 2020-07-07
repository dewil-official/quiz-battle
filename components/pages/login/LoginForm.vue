<template>
  <v-card class="login-form pa-4">
    <v-card-title>
      <h2>{{ text.title }}</h2>
    </v-card-title>
    <v-card-text v-if="userNames.length > 0">
      <h3 class="mt-2">{{ text.user }}</h3>
      <v-chip-group
        v-model="userSelect"
        active-class="secondary black--text"
        column
      >
        <v-chip v-for="user in userNames" :key="user">
          <v-avatar left> <v-icon>mdi-account-circle</v-icon> </v-avatar
          >{{ user }}</v-chip
        >
      </v-chip-group>
      <h3 class="my-2">{{ text.password }}</h3>
      <v-text-field
        label="Your Password"
        v-model="passwordField"
        type="password"
        clearable
        filled
      ></v-text-field>
      <v-alert v-if="error" type="error">
        {{ text.errWrongPassword }}
        Error: {{ error }}
      </v-alert>
    </v-card-text>
    <v-card-text v-else>
      <v-layout class="pa-8" column justify-center align-center>
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="loginButton()"
        v-on:keypress.enter="loginButton()"
        >{{ text.button }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    userNames: Array,
    error: String,
  },
  data: () => {
    return {
      text: {
        title: 'Log In!',
        user: 'User',
        password: 'Password',
        button: 'Login',
        errWrongPassword: 'Wrong Password! Try again.',
      },
      userSelect: '',
      passwordField: '',
    }
  },
  methods: {
    loginButton() {
      this.$emit('loginButton', {
        name: this.userNames[this.userSelect],
        password: this.passwordField,
      })
    },
  },
}
</script>

<style scoped>
@media (min-width: 600px) {
  .login-form {
    min-width: 400px;
    max-width: 800px;
  }
}
</style>
