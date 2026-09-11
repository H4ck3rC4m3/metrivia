import type { TranslationKey } from '../i18n/ca'

export interface City {
  id: string
  nameKey: TranslationKey
  countryCode: string
  stations: Station[]
  lines: MetroLine[]
}

export interface Station {
  id: string
  name: string
}

export interface MetroLine {
  id: string
  name: string
  color: string
  textColor?: string
  routes: MetroRoute[]
}

export interface MetroRoute {
  id: string
  name?: string
  stopIds: string[]
  circular?: boolean
}

export interface ResolvedRoute {
  city: City
  line: MetroLine
  route: MetroRoute
}
