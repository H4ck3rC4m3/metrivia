import type { GameStats, Preferences, ThemeMode } from '../types/game'
import { normalizeLocale } from '../i18n/locales'

const preferencesKey = 'metrodle:preferences:v1'
const statsKey = 'metrodle:stats:v1'
const themeKey = 'metrodle:theme:v1'

const defaultPreferences: Preferences = {
  cityId: 'barcelona',
  difficulty: 'expert',
  lineSelection: 'random'
}

const defaultStats: GameStats = {
  played: 0,
  correct: 0,
  currentStreak: 0,
  bestStreak: 0
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') {
    return fallback
  }

  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return { ...fallback, ...JSON.parse(raw) } as T
  } catch {
    localStorage.removeItem(key)
    return fallback
  }
}

function writeJson<T>(key: string, value: T): void {
  if (typeof localStorage === 'undefined') {
    return
  }

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be disabled or full. The game remains playable without persistence.
  }
}

export function loadPreferences(): Preferences {
  const preferences = readJson(preferencesKey, defaultPreferences)
  const locale = normalizeLocale(preferences.locale)
  return locale ? { ...preferences, locale } : preferences
}

export function savePreferences(preferences: Preferences): void {
  const existing = readJson<Preferences>(preferencesKey, defaultPreferences)
  writeJson(preferencesKey, { ...existing, ...preferences, locale: preferences.locale ?? existing.locale })
}

export function loadStats(): GameStats {
  return readJson(statsKey, defaultStats)
}

export function saveStats(stats: GameStats): void {
  writeJson(statsKey, stats)
}

export function loadTheme(): ThemeMode {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(themeKey)
    if (saved === 'light' || saved === 'dark') {
      return saved
    }
  }

  if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}

export function saveTheme(theme: ThemeMode): void {
  if (typeof localStorage === 'undefined') return

  try {
    localStorage.setItem(themeKey, theme)
  } catch {
    // Theme selection is optional; ignore storage failures.
  }
}

export function recordResult(stats: GameStats, correct: boolean): GameStats {
  const currentStreak = correct ? stats.currentStreak + 1 : 0
  return {
    played: stats.played + 1,
    correct: stats.correct + (correct ? 1 : 0),
    currentStreak,
    bestStreak: Math.max(stats.bestStreak, currentStreak)
  }
}
