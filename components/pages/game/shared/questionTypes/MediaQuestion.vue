<template>
  <v-col>
    <h2 class="ml-2 mt-2">{{ question.text }}</h2>
    <v-img class="mt-4" v-if="question.mediaType == MediaType.image" :src="question.mediaUrl"></v-img>
    <iframe
      class="mt-4"
      v-if="question.mediaType == MediaType.youtube"
      :src="question.mediaUrl"
      width="100%"
      height="300px"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { MediaQuestion, MediaType } from '~/types/interfaces/game/questionTypes'
@Component
export default class MediaQuestionView extends Vue {
  @Prop({ default: {} }) question!: MediaQuestion
  MediaType: any = MediaType
}
</script>
