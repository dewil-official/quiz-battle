<template>
  <v-col>
    <h2 class="ml-2 mt-2">{{ question.text }}</h2>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { GuessQuestion } from '~/types/interfaces/game/questionTypes'
@Component
export default class GuessQuestionView extends Vue {
  @Prop({ default: {} }) question!: GuessQuestion
}
</script>
