import { getRandomRoute, getRouteStations } from '../../data/cities'
import { consecutiveSegment, randomItem, shuffle } from '../../lib/random'
import type { City } from '../../types/metro'
import type { Difficulty, WrongStopRound } from '../../types/game'
import { resolveStopCount } from '../shared/difficulty'

export function createWrongStopRound(
  city: City,
  difficulty: Difficulty,
  lineId?: string,
  previousRoundId?: string
): WrongStopRound {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const resolved = getRandomRoute(city, 'wrong-stop', difficulty, lineId)
    const routeStops = getRouteStations(city, resolved.route)
    const stopCount =
      difficulty === 'expert'
        ? routeStops.length
        : Math.min(routeStops.length, Math.max(4, Math.min(resolveStopCount(routeStops.length, difficulty), 8)))
    const segment = consecutiveSegment(routeStops, stopCount)
    const lineStopIds = new Set(resolved.line.routes.flatMap((route) => route.stopIds))
    const segmentIds = new Set(segment.map((station) => station.id))
    const intruderPool = city.stations.filter(
      (station) => !lineStopIds.has(station.id) && !segmentIds.has(station.id)
    )

    if (intruderPool.length === 0) {
      continue
    }

    const intruder = randomItem(intruderPool)
    const stops = shuffle([...segment, intruder])
    const id = `wrong:${city.id}:${resolved.line.id}:${resolved.route.id}:${segment.map((stop) => stop.id).join('-')}:${intruder.id}`

    if (id === previousRoundId && attempt < 9) {
      continue
    }

    return {
      id,
      mode: 'wrong-stop',
      cityId: city.id,
      lineId: resolved.line.id,
      routeId: resolved.route.id,
      promptKey: 'wrongStop.prompt',
      stops,
      intruder
    }
  }

  throw new Error('Could not create a wrong-stop round.')
}

export function isWrongStopAnswer(answerId: string, round: WrongStopRound): boolean {
  return answerId === round.intruder.id
}
