<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <v-card class="pa-8" elevation="12">
        <v-col>
          <h2>The Results</h2>
          <v-subheader>The admin will reveal the answers one by one.</v-subheader>
          <PlayerRevealList :players="gameData.players" :gameInfo="gameData.gameInfo" isMaster />
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import PlayerRevealList from '../shared/PlayerRevealList.vue'
import { GameData } from '~/types/interfaces/game/gameUpdate'

@Component({
  components: {
    PlayerRevealList,
  },
})
export default class QuestionResults extends Vue {
  @Prop({ default: null }) gameData!: GameData | null
}
</script>
