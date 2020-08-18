<template>
  <v-col>
    <h2 class="ml-2 mt-2">{{ question.text }}</h2>
    <v-img class="mt-4" v-if="hasImage" :src="question.mediaUrl"></v-img>
    <iframe
      class="mt-4"
      v-if="hasYoutube"
      :src="question.mediaUrl"
      width="100%"
      height="300px"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <v-row class="ml-2" justify="start" align="baseline" v-if="hasRange">
      <v-chip outlined>{{ question.guessRange.start }}</v-chip>
      <p class="mx-4">to</p>
      <v-chip outlined>{{ question.guessRange.stop }}</v-chip>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import {
  NormalQuestion,
  GuessQuestion,
  ChoiceQuestion,
  MediaQuestion,
  MediaType,
} from '~/types/interfaces/game/questionTypes'
@Component
export default class QuestionCard extends Vue {
  @Prop({ default: {} }) question!:
    | NormalQuestion
    | GuessQuestion
    | ChoiceQuestion
    | MediaQuestion

  get hasImage(): boolean {
    if ((this.question as MediaQuestion).mediaType == MediaType.image) {
      return true
    }
    return false
  }

  get hasYoutube(): boolean {
    if ((this.question as MediaQuestion).mediaType == MediaType.youtube) {
      return true
    }
    return false
  }

  get hasRange(): boolean {
    if (((this.question! as unknown) as GuessQuestion).guessRange) {
      return true
    }
    return false
  }
}
</script>
