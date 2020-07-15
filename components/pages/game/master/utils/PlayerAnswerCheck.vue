<template>
  <v-list two-line>
    <div v-for="(player, playerIndex) in players" :key="player.name">
      <v-list-item>
        <v-list-item-avatar color="primary">
          <span class="white--text headline">{{ getNameAbbreviation(player.name) }}</span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="white-space: normal;" v-text="player.answer"></v-list-item-title>
          <v-list-item-subtitle>{{ player.name }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-checkbox
            v-model="approvedAnswers[playerIndex]"
            @change="emitApprovedAnswers"
            color="primary"
          ></v-checkbox>
        </v-list-item-action>
      </v-list-item>
      <v-divider class="mx-3" v-if="playerIndex < players.length - 1" />
    </div>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import PlayerInfo from '~/types/interfaces/game/playerInfo'
import { JokerTypes } from '~/types/enums/game/jokerTypes'
import ApprovedAnswers from '~/types/interfaces/master/approvedAnswers'

@Component
export default class PlayerAnswerCheck extends Vue {
  @Prop({ default: [] }) players!: PlayerInfo[]

  approvedAnswers: any[] = []

  getNameAbbreviation(name: string | undefined): string {
    if (name === undefined) return ''
    if (name.length < 3) return name
    else return name.substring(0, 2)
  }

  emitApprovedAnswers() {
    let approvals: ApprovedAnswers = this.approvedAnswers.map(
      (isCorrect, index) => {
        return {
          name: this.players[index].name,
          isCorrect: !!isCorrect,
        }
      }
    )
    this.$emit('approvedAnswers', approvals)
  }

  mounted() {
    let checkboxes: any[] = []
    this.players.forEach(() => {
      checkboxes.push(false)
    })
    this.approvedAnswers = checkboxes
    this.emitApprovedAnswers()
  }
}
</script>
