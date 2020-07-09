<template>
  <v-container>
    <v-row class="ma-n4">
      <v-col cols="12" md="6" class="pa-0">
        <v-card class="ma-4 pa-4" elevation="12">
          <h2>What is the current Question?</h2>
          <hr class="my-4" />
          <h4 v-if="questionTypeString == 'normal'">
            <v-icon>mdi-fountain-pen-tip</v-icon>
            <i>Players are free to type their Answer.</i>
          </h4>
          <v-list v-if="questionTypeString == 'choice'">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-alpha-a</v-icon>
              </v-list-item-icon>
              <v-list-item-title>A very cool Answer.</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-alpha-b</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Another Nice Answer.</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-alpha-c</v-icon>
              </v-list-item-icon>
              <v-list-item-title>WeIrD AnSwEr.</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-alpha-d</v-icon>
              </v-list-item-icon>
              <v-list-item-title>You got this!</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="pa-0">
        <v-card class="ma-4 pa-4" elevation="12">
          <h3>Live-Answers</h3>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="pa-0">
        <v-card class="ma-4 py-4" elevation="12">
          <v-row class="mx-4" align="center">
            <v-btn small>Back</v-btn>
            <v-spacer></v-spacer>
            <v-chip small>1 / 10</v-chip>
            <v-spacer></v-spacer>
            <v-btn small>Continue</v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { QuestionType } from '../../../types/game/question'
@Component
export default class MasterView extends Vue {
  questionType: QuestionType = QuestionType.choice

  // Cannot use the enum in Vue Template, so..
  get questionTypeString(): string {
    if (this.questionType == QuestionType.normal) return 'normal'
    if (this.questionType == QuestionType.choice) return 'choice'
    if (this.questionType == QuestionType.guess) return 'guess'
    if (this.questionType == QuestionType.media) return 'media'
    return 'normal'
  }
}
</script>
