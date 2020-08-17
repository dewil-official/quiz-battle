<template>
  <v-list two-line>
    <div v-for="(player, playerIndex) in players" :key="player.name">
      <v-list-item ripple>
        <v-list-item-avatar color="primary">
          <span class="white--text headline">{{ getNameAbbreviation(player.name) }}</span>
        </v-list-item-avatar>

        <v-list-item-content v-if="joinMode">
          <v-list-item-title v-text="player.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-content v-if="answerMode || questionResultsMode">
          <v-list-item-title style="white-space: normal;" v-text="player.answer"></v-list-item-title>
          <v-list-item-subtitle>
            <span class="mr-4">{{ player.name }}</span>
            <span class="mr-4">
              <v-icon x-small>mdi-trophy</v-icon>
              {{ player.score }}
            </span>
            <span>
              <span v-for="(joker, jokerIndex) in player.jokers" :key="jokerIndex">
                <v-icon
                  v-if="getJokerString(joker) == 'x3'"
                  :color="isActiveJoker(player, joker, jokerIndex) ? 'green' : 'grey'"
                  x-small
                >mdi-numeric-3-circle-outline</v-icon>
                <v-icon
                  v-if="getJokerString(joker) == 'spy'"
                  :color="isActiveJoker(player, joker, jokerIndex) ? 'green' : 'grey'"
                  x-small
                >mdi-domino-mask</v-icon>
                <v-icon
                  v-if="getJokerString(joker) == 'hint'"
                  :color="isActiveJoker(player, joker, jokerIndex) ? 'green' : 'grey'"
                  x-small
                >mdi-form-textbox-password</v-icon>
              </span>
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon v-if="answerMode">
          <v-icon v-if="player.isDone" color="light-green darken-2">mdi-check-bold</v-icon>
        </v-list-item-icon>

        <v-list-item-icon v-if="questionResultsMode">
          <v-icon v-if="isPlayerCorrect(player.name)">mdi-check-bold</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-divider class="mx-3" v-if="playerIndex < players.length - 1" />
    </div>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import PlayerInfo from '~/types/interfaces/game/playerInfo'
import { JokerTypes } from '~/types/enums/game/jokerTypes'
import GameInfo from '~/types/interfaces/game/gameInfo'

@Component
export default class PlayerList extends Vue {
  @Prop({ default: [] }) players!: PlayerInfo[]
  @Prop({ default: null }) gameInfo!: GameInfo | null

  @Prop({ default: false, type: Boolean }) answerMode!: boolean
  @Prop({ default: false, type: Boolean }) joinMode!: boolean
  @Prop({ default: false, type: Boolean }) questionResultsMode!: boolean

  getResultOfPlayer(name: string) {
    if (this.gameInfo && this.gameInfo.questionResults) {
      return this.gameInfo.questionResults.find((player) => {
        player.name == name
      })
    }
  }

  isPlayerCorrect(name: string): boolean | null {
    let playerResults = this.getResultOfPlayer(name)
    if (playerResults) {
      return playerResults.isCorrect ? true : false
    } else {
      return false
    }
  }

  getNameAbbreviation(name: string | undefined): string {
    if (name === undefined) return ''
    if (name.length < 3) return name
    else return name.substring(0, 2)
  }

  getJokerString(joker: JokerTypes) {
    if (joker == JokerTypes.x3) return 'x3'
    if (joker == JokerTypes.spy) return 'spy'
    if (joker == JokerTypes.hint) return 'hint'
    return ''
  }

  isActiveJoker(player: PlayerInfo, joker: JokerTypes, index: number): boolean {
    let playerIndex = this.players.indexOf(player)
    if (!this.players[playerIndex].jokers) return false
    let jokerIndex = this.players[playerIndex].jokers!.indexOf(joker)
    let isActive = joker == this.players[playerIndex].activeJoker
    return isActive ? jokerIndex == index : false
  }
}
</script>
