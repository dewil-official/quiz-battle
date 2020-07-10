<template>
  <v-expansion-panels focusable accordion>
    <v-expansion-panel v-for="player in answers" :key="player.name">
      <v-expansion-panel-header>
        <span>
          <b class="mr-2">{{ player.name }}:</b>
          <i>{{ player.answer }}</i>
        </span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>...</v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { JokerTypes } from '../../../../types/game/jokerTypes'

@Component
export default class PlayerAnswers extends Vue {
  answers = [
    {
      name: 'David',
      score: 2,
      jokers: [JokerTypes.x3, JokerTypes.spy, JokerTypes.spy, JokerTypes.hint],
      activeJoker: JokerTypes.x3,
      answer: 'The best ga',
    },
    {
      name: 'Dobrik',
      score: 0,
      jokers: [],
      activeJoker: null,
      answer: 'The least favorite game.',
    },
  ]
}
</script>