<template>
  <v-card class="login-form pa-4">
    <v-card-title>
      <h2>{{ text.title }}</h2>
    </v-card-title>
    <v-card-text v-if="userNames.length > 0">
      <h3 class="mt-2">{{ text.user }}</h3>
      <v-chip-group v-model="userSelect" active-class="secondary black--text" column>
        <v-chip v-for="user in userNames" :key="user">
          <v-avatar left>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          {{ user }}
        </v-chip>
      </v-chip-group>
      <h3 class="my-2">{{ text.password }}</h3>
      <v-text-field
        label="Your Password"
        v-model="passwordField"
        type="password"
        clearable
        filled
        @keyup.enter="loginButton()"
      ></v-text-field>
      <v-alert v-if="error" type="error">
        {{ text.errWrongPassword }}
        Error: {{ error }}
      </v-alert>
    </v-card-text>
    <v-card-text v-else>
      <v-layout class="pa-8" column justify-center align-center>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="loginButton()">{{ text.button }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Model } from 'nuxt-property-decorator'
import LoginData from '~/types/interfaces/auth/loginData'

@Component
export default class LoginForm extends Vue {
  text = {
    title: 'Log In!',
    user: 'User',
    password: 'Password',
    button: 'Login',
    errWrongPassword: 'Wrong Password! Try again.',
  }

  userSelect: number = -1
  passwordField: string = ''

  @Prop({ default: [] }) userNames!: string[]

  @Prop({ default: '' }) error!: string

  loginButton() {
    if (this.userSelect != undefined && this.userSelect > -1) {
      let loginData: LoginData = {
        name: this.userNames[this.userSelect],
        password: this.passwordField,
      }
      this.$emit('loginButton', loginData)
    }
  }
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
