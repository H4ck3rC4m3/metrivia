export interface City {
  id: string
  name: string
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
