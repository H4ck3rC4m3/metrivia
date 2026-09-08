import type { City } from '../../types/metro'
import type { Difficulty, GameMode, GameRound } from '../../types/game'
import { createMissingStopRound } from '../missingStop/logic'
import { createOrderStopsRound } from '../orderStops/logic'
import { createWrongStopRound } from '../wrongStop/logic'

export function createRound(
  city: City,
  mode: GameMode,
  difficulty: Difficulty,
  lineId?: string,
  previousRoundId?: string
): GameRound {
  if (mode === 'order-stops') {
    return createOrderStopsRound(city, difficulty, lineId, previousRoundId)
  }
  if (mode === 'missing-stop') {
    return createMissingStopRound(city, difficulty, lineId, previousRoundId)
  }
  return createWrongStopRound(city, difficulty, lineId, previousRoundId)
}
