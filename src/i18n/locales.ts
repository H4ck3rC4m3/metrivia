export const supportedLocales = {
  ca: {
    code: 'ca',
    name: 'Català',
    shortName: 'CA',
    direction: 'ltr'
  },
  en: {
    code: 'en',
    name: 'English',
    shortName: 'EN',
    direction: 'ltr'
  },
  es: {
    code: 'es',
    name: 'Español',
    shortName: 'ES',
    direction: 'ltr'
  }
} as const

export type Locale = keyof typeof supportedLocales
export const DEFAULT_LOCALE: Locale = 'ca'

export function isSupportedLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && value in supportedLocales)
}

export function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) return null
  const lower = value.toLowerCase()
  if (isSupportedLocale(lower)) return lower
  const base = lower.split('-')[0]
  return isSupportedLocale(base) ? base : null
}

