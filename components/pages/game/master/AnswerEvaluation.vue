<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <v-card class="pa-8" elevation="12">
        <v-col>
          <h2>Answer Validation</h2>
          <v-subheader>Please select the correct answers.</v-subheader>
          <v-card color="green lighten-3" flat light>
            <v-card-title color="black--text">
              <v-icon color="black" class="mr-4">mdi-check-bold</v-icon>
              {{ gameData.question.correctAnswer }}
            </v-card-title>
          </v-card>
          <PlayerAnswerCheck :players="gameData.players" @approvedAnswers="updateApprovedAnswers" />
          <v-btn block color="primary" dark @click="submitApproval">
            Accept Answers
            <v-icon right>mdi-check</v-icon>
          </v-btn>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { GameData } from '~/types/interfaces/game/gameUpdate'
import PlayerAnswerCheck from './utils/PlayerAnswerCheck.vue'
import ApprovedAnswers from '../../../../types/interfaces/master/approvedAnswers'
@Component({
  components: { PlayerAnswerCheck },
})
export default class AnswerEvaluation extends Vue {
  @Prop({ default: null }) gameData!: GameData | null
  approvedAnswers: ApprovedAnswers = []

  updateApprovedAnswers(approvals: ApprovedAnswers) {
    this.approvedAnswers = approvals
  }

  get authToken(): string {
    return this.$store.state.auth.token
  }

  submitApproval() {
    this.$socket.client.emit(
      'approve_answers',
      this.authToken,
      this.approvedAnswers
    )
  }
}
</script>
