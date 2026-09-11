import { barcelona } from './barcelona'
import { granada } from './granada'
import { malaga } from './malaga'
import { moscow } from './moscow'
import { palma } from './palma'
import { seville } from './seville'
import type { City, MetroLine, MetroRoute, ResolvedRoute, Station } from '../types/metro'
import type { Difficulty, GameMode } from '../types/game'
import { randomItem } from '../lib/random'
import { resolveStopCount } from '../games/shared/difficulty'

export const cities: City[] = [barcelona, granada, malaga, palma, seville]

export function getCity(cityId: string): City {
  const city = cities.find((candidate) => candidate.id === cityId)
  if (!city) {
    throw new Error(`Unknown city: ${cityId}`)
  }
  return city
}

export function getStation(city: City, stationId: string): Station {
  const station = city.stations.find((candidate) => candidate.id === stationId)
  if (!station) {
    throw new Error(`Unknown station "${stationId}" in ${city.id}.`)
  }
  return station
}

export function getRouteStations(city: City, route: MetroRoute): Station[] {
  return route.stopIds.map((stationId) => getStation(city, stationId))
}

export function getCityLines(city: City): MetroLine[] {
  return city.lines
}

export function getStationLines(city: City, stationId: string): MetroLine[] {
  return city.lines.filter((line) =>
    line.routes.some((route) => route.stopIds.includes(stationId))
  )
}

export function getLine(city: City, lineId: string): MetroLine {
  const line = city.lines.find((candidate) => candidate.id === lineId)
  if (!line) {
    throw new Error(`Unknown line "${lineId}" in ${city.id}.`)
  }
  return line
}

function minStopsForMode(mode: GameMode, difficulty: Difficulty): number {
  if (difficulty === 'expert') {
    return 1
  }

  const base = resolveStopCount(Number.MAX_SAFE_INTEGER, difficulty)
  if (mode === 'missing-stop') {
    return Math.min(base, 5)
  }
  if (mode === 'wrong-stop') {
    return Math.min(base, 4)
  }
  return base
}

function stopCountForMode(totalStops: number, mode: GameMode, difficulty: Difficulty): number {
  if (mode === 'missing-stop') {
    return difficulty === 'expert'
      ? totalStops
      : Math.min(totalStops, Math.max(5, Math.min(resolveStopCount(totalStops, difficulty), 8)))
  }
  if (mode === 'wrong-stop') {
    return difficulty === 'expert'
      ? totalStops
      : Math.min(totalStops, Math.max(4, Math.min(resolveStopCount(totalStops, difficulty), 8)))
  }
  return difficulty === 'expert' ? totalStops : Math.max(2, resolveStopCount(totalStops, difficulty))
}

export function isRouteCompatible(
  city: City,
  route: MetroRoute,
  mode: GameMode,
  difficulty: Difficulty
): boolean {
  if (route.stopIds.length < minStopsForMode(mode, difficulty)) {
    return false
  }

  if (mode === 'missing-stop') {
    const stopCount = stopCountForMode(route.stopIds.length, mode, difficulty)
    return city.stations.length - stopCount >= 3
  }

  if (mode === 'wrong-stop') {
    const line = city.lines.find((candidate) =>
      candidate.routes.some((candidateRoute) => candidateRoute.id === route.id)
    )
    if (!line) return false
    const lineStopIds = new Set(line.routes.flatMap((lineRoute) => lineRoute.stopIds))
    return city.stations.some((station) => !lineStopIds.has(station.id))
  }

  return true
}

export function getCompatibleRoutes(
  city: City,
  mode: GameMode,
  difficulty: Difficulty
): ResolvedRoute[] {
  return city.lines.flatMap((line) =>
    line.routes
      .filter((route) => isRouteCompatible(city, route, mode, difficulty))
      .map((route) => ({ city, line, route }))
  )
}

export function getRandomRoute(
  city: City,
  mode: GameMode,
  difficulty: Difficulty,
  lineId?: string
): ResolvedRoute {
  const routes = getCompatibleRoutes(city, mode, difficulty).filter(
    (candidate) => !lineId || candidate.line.id === lineId
  )
  if (routes.length === 0) {
    throw new Error(`No compatible routes found in ${city.id}.`)
  }
  return randomItem(routes)
}

export function getRandomLineWithMinLength(city: City, minimumStops: number): MetroLine {
  const lines = city.lines.filter((line) =>
    line.routes.some((route) => route.stopIds.length >= minimumStops)
  )
  if (lines.length === 0) {
    throw new Error(`No line in ${city.id} has at least ${minimumStops} stops.`)
  }
  return randomItem(lines)
}

export function validateCity(city: City): string[] {
  const errors: string[] = []
  const stationIds = new Set<string>()
  const lineIds = new Set<string>()
  const routeIds = new Set<string>()
  const colorPattern = /^#[0-9a-f]{6}$/i

  for (const station of city.stations) {
    if (stationIds.has(station.id)) errors.push(`${city.id}: duplicated station id ${station.id}`)
    stationIds.add(station.id)
  }

  for (const line of city.lines) {
    if (lineIds.has(line.id)) errors.push(`${city.id}: duplicated line id ${line.id}`)
    if (!colorPattern.test(line.color)) errors.push(`${city.id}: invalid color in line ${line.id}`)
    if (line.textColor && !colorPattern.test(line.textColor)) {
      errors.push(`${city.id}: invalid text color in line ${line.id}`)
    }
    lineIds.add(line.id)

    for (const route of line.routes) {
      if (routeIds.has(route.id)) errors.push(`${city.id}: duplicated route id ${route.id}`)
      if (route.stopIds.length === 0) errors.push(`${city.id}: empty route ${route.id}`)
      routeIds.add(route.id)

      const seenStops = new Set<string>()
      for (const stopId of route.stopIds) {
        if (!stationIds.has(stopId)) errors.push(`${city.id}: missing station ${stopId}`)
        if (seenStops.has(stopId)) errors.push(`${city.id}: repeated stop ${stopId} in ${route.id}`)
        seenStops.add(stopId)
      }
    }
  }

  return errors
}

export function validateAllCities(): void {
  const errors = cities.flatMap(validateCity)
  if (errors.length > 0) {
    throw new Error(`Invalid metro data:\n${errors.join('\n')}`)
  }
}
