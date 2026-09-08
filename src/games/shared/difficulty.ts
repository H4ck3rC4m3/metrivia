import type { Difficulty, DifficultyConfig } from '../../types/game'

export const difficultyConfig: Record<Difficulty, DifficultyConfig> = {
  easy: {
    stopCount: 5,
    optionCount: 4
  },
  normal: {
    stopCount: 7,
    optionCount: 4
  },
  hard: {
    stopCount: 10,
    optionCount: 4
  },
  expert: {
    stopCount: 'all',
    optionCount: 4
  }
}

export function resolveStopCount(totalStops: number, difficulty: Difficulty): number {
  const requested = difficultyConfig[difficulty].stopCount
  return requested === 'all' ? totalStops : Math.min(requested, totalStops)
}
