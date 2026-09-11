import { derived, get, writable } from 'svelte/store'
import { ca, type TranslationKey } from './ca'
import { en } from './en'
import { es } from './es'
import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  normalizeLocale,
  supportedLocales,
  type Locale
} from './locales'
import type { TranslationDictionary, TranslationParams, TranslationValue } from './types'

const localeStorageKey = 'metrodle:locale:v1'
const preferencesStorageKey = 'metrodle:preferences:v1'

const dictionaries = {
  ca,
  en,
  es
} satisfies Record<Locale, TranslationDictionary>

export { DEFAULT_LOCALE, supportedLocales, type Locale, type TranslationKey }

export const currentLocale = writable<Locale>(DEFAULT_LOCALE)

function validateDictionaries(): void {
  if (typeof console === 'undefined') return

  const baseKeys = Object.keys(ca).sort()
  for (const [locale, dictionary] of Object.entries(dictionaries)) {
    const keys = Object.keys(dictionary).sort()
    const missing = baseKeys.filter((key) => !keys.includes(key))
    const extra = keys.filter((key) => !baseKeys.includes(key))
    if (missing.length > 0 || extra.length > 0) {
      console.warn(`[i18n] Locale ${locale} does not match ca keys.`, { missing, extra })
    }
  }
}

function readSavedLocale(): Locale | null {
  if (typeof localStorage === 'undefined') return null
  const directLocale = normalizeLocale(localStorage.getItem(localeStorageKey))
  if (directLocale) return directLocale

  try {
    const preferences = JSON.parse(localStorage.getItem(preferencesStorageKey) ?? '{}') as {
      locale?: string
    }
    return normalizeLocale(preferences.locale)
  } catch {
    return null
  }
}

function writeSavedLocale(locale: Locale): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(localeStorageKey, locale)
    const preferences = JSON.parse(localStorage.getItem(preferencesStorageKey) ?? '{}') as Record<
      string,
      unknown
    >
    localStorage.setItem(preferencesStorageKey, JSON.stringify({ ...preferences, locale }))
  } catch {
    // Locale persistence is optional; the UI still updates immediately.
  }
}

function localeFromUrl(): Locale | null {
  if (typeof window === 'undefined') return null
  return normalizeLocale(new URLSearchParams(window.location.search).get('lang'))
}

function localeFromNavigator(): Locale | null {
  if (typeof navigator === 'undefined') return null
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const candidate of candidates) {
    const locale = normalizeLocale(candidate)
    if (locale) return locale
  }
  return null
}

function updateUrlLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.set('lang', locale)
  window.history.replaceState({}, '', url)
}

function syncDocument(locale: Locale): void {
  if (typeof document === 'undefined') return
  const definition = supportedLocales[locale]
  document.documentElement.lang = definition.code
  document.documentElement.dir = definition.direction
  document.title = translateWithLocale(locale, 'app.metaTitle')

  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (description) {
    description.content = translateWithLocale(locale, 'app.metaDescription')
  }
}

export function resolveInitialLocale(): Locale {
  return localeFromUrl() ?? readSavedLocale() ?? localeFromNavigator() ?? DEFAULT_LOCALE
}

export function initializeLocale(): void {
  validateDictionaries()
  setLocale(resolveInitialLocale(), { updateUrl: false })
}

export function setLocale(locale: Locale, options: { updateUrl?: boolean } = {}): void {
  if (!isSupportedLocale(locale)) return
  currentLocale.set(locale)
  writeSavedLocale(locale)
  if (options.updateUrl ?? true) {
    updateUrlLocale(locale)
  }
  syncDocument(locale)
}

export function getLocale(): Locale {
  return get(currentLocale)
}

function interpolate(template: string, params: TranslationParams = {}, locale: Locale): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = params[name]
    if (value === undefined) return match
    return typeof value === 'number' ? formatNumberWithLocale(locale, value) : value
  })
}

function valueForLocale(locale: Locale, key: TranslationKey): TranslationValue | undefined {
  return dictionaries[locale][key] ?? dictionaries[DEFAULT_LOCALE][key]
}

export function translateWithLocale(
  locale: Locale,
  key: TranslationKey,
  params: TranslationParams = {}
): string {
  const value = valueForLocale(locale, key)
  if (!value) {
    if (typeof console !== 'undefined') {
      console.warn(`[i18n] Missing translation key: ${key}`)
    }
    return `[missing: ${key}]`
  }

  if (typeof value === 'string') {
    return interpolate(value, params, locale)
  }

  const count = params.count
  const category =
    typeof count === 'number' ? new Intl.PluralRules(locale).select(count) : 'other'
  return interpolate(value[category] ?? value.other, params, locale)
}

export function formatNumberWithLocale(locale: Locale, value: number): string {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatNumber(value: number): string {
  return formatNumberWithLocale(getLocale(), value)
}

export const t = derived(
  currentLocale,
  ($locale) =>
    (key: TranslationKey, params: TranslationParams = {}) =>
      translateWithLocale($locale, key, params)
)

export const numberFormatter = derived(
  currentLocale,
  ($locale) => (value: number) => formatNumberWithLocale($locale, value)
)
