<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">{{ pageNotFound }}</h1>
    <h1 v-else>{{ otherError }}</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({
  layout: 'empty',
})
export default class ErrorLayout extends Vue {
  @Prop()
  error!: Object

  pageNotFound: string = '404 Not Found'
  otherError: string = 'An error occurred'
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
