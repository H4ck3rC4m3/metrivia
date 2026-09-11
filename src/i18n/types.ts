export type TranslationValue = string | { one: string; other: string; [category: string]: string }
export type TranslationDictionary = Record<string, TranslationValue>
export type TranslationParams = Record<string, string | number>

