import type { Difficulty, GameModeDefinition } from '../types/game'

export const uiText = {
  appName: 'Metrodle',
  intro: 'Coneixes realment la xarxa de metro?',
  chooseCity: 'Tria una ciutat',
  chooseMode: 'Com vols jugar?',
  setup: 'Configura la partida',
  difficulty: 'Dificultat',
  line: 'Línia',
  manualLine: 'Triar línia',
  randomLine: 'Línia aleatòria',
  start: 'Començar',
  check: 'Comprovar',
  newRound: 'Nova ronda',
  changeSetup: 'Canviar configuració',
  changeMode: 'Canviar modalitat',
  back: 'Enrere',
  correct: 'Correcte!',
  incorrect: 'No exactament.',
  statsPlayed: 'Partides',
  statsCorrect: 'Encerts',
  bestStreak: 'Millor ratxa',
  currentStreak: 'Ratxa',
  noCompatibleLines: 'No hi ha línies compatibles amb aquesta configuració.',
  switchToLight: 'Canvia a mode clar',
  switchToDark: 'Canvia a mode fosc'
}

export const gameModes: GameModeDefinition[] = [
  {
    id: 'order-stops',
    name: 'Ordenar parades',
    description: "Col·loca les estacions en l'ordre correcte."
  },
  {
    id: 'missing-stop',
    name: 'Quina falta?',
    description: 'Descobreix quina estació falta a la línia.'
  },
  {
    id: 'wrong-stop',
    name: 'La intrusa',
    description: "Troba l'estació que no pertany a la línia."
  }
]

export const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Fàcil',
  normal: 'Normal',
  hard: 'Difícil',
  expert: 'Expert'
}
