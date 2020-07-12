<template>
  <v-col>
    <h2 class="ml-2 mt-2">{{ question.text }}</h2>
    <v-list disabled>
      <v-list-item-group
        :value="question.showAnswer ? question.correctAnswer : null"
        color="green darken-4"
      >
        <v-list-item
          v-for="(choice, choiceIndex) in question.choices"
          :key="choiceIndex"
          :value="choice"
        >
          <v-list-item-icon>
            <v-icon large v-if="choiceIndex == 0">mdi-alpha-a</v-icon>
            <v-icon large v-if="choiceIndex == 1">mdi-alpha-b</v-icon>
            <v-icon large v-if="choiceIndex == 2">mdi-alpha-c</v-icon>
            <v-icon large v-if="choiceIndex == 3">mdi-alpha-d</v-icon>
            <v-icon large v-if="choiceIndex == 4">mdi-alpha-e</v-icon>
            <v-icon large v-if="choiceIndex == 5">mdi-alpha-f</v-icon>
            <v-icon large v-if="choiceIndex == 6">mdi-alpha-g</v-icon>
            <v-icon large v-if="choiceIndex == 7">mdi-alpha-h</v-icon>
            <v-icon large v-if="choiceIndex > 7">mdi-numeric-{{choiceIndex + 1}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title style="white-space: normal;">{{ choice }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ChoiceQuestion } from '~/types/interfaces/game/questionTypes'
@Component
export default class ChoiceQuestionView extends Vue {
  @Prop({ default: {} }) question!: ChoiceQuestion
}
</script>
