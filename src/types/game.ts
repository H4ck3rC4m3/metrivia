import type { Station } from './metro'
import type { Locale } from '../i18n/locales'
import type { TranslationKey } from '../i18n/ca'

export type GameMode = 'order-stops' | 'missing-stop' | 'wrong-stop'
export type Difficulty = 'easy' | 'normal' | 'hard' | 'expert'
export type LineSelectionMode = 'manual' | 'random'
export type GameStatus = 'playing' | 'correct' | 'incorrect'
export type ThemeMode = 'light' | 'dark'

export interface DifficultyConfig {
  stopCount: number | 'all'
  optionCount: number
}

export interface GameSettings {
  cityId: string
  gameMode: GameMode
  difficulty: Difficulty
  lineSelection: LineSelectionMode
  lineId?: string
}

export interface GameModeDefinition {
  id: GameMode
  name: string
  description: string
}

export interface RoundBase {
  id: string
  cityId: string
  lineId: string
  routeId: string
  promptKey: TranslationKey
}

export interface OrderStopsRound extends RoundBase {
  mode: 'order-stops'
  correctStopIds: string[]
  shuffledStops: Station[]
}

export interface MissingStopRound extends RoundBase {
  mode: 'missing-stop'
  sequence: Array<Station | null>
  answer: Station
  options: Station[]
}

export interface WrongStopRound extends RoundBase {
  mode: 'wrong-stop'
  stops: Station[]
  intruder: Station
}

export type GameRound = OrderStopsRound | MissingStopRound | WrongStopRound

export interface GameStats {
  played: number
  correct: number
  currentStreak: number
  bestStreak: number
}

export interface Preferences {
  cityId: string
  difficulty: Difficulty
  lineSelection: LineSelectionMode
  locale?: Locale
}
