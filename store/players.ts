import { PlayerState } from '~/types/state/playerState'
import { Player } from '~/types/core/player'

export const state: PlayerState = {
  playerList: [],
}

export const mutations = {
  updatePlayers(playerList: Array<Player>) {
    state.playerList = playerList
  },
}
