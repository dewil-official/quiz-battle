<template>
  <v-col justify="center" align="center" width="100%" height="100%">
    <v-row justify="center" align="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class LoadingPage extends Vue {}
</script>