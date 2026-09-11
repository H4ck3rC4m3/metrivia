import { getRandomRoute, getRouteStations } from '../../data/cities'
import { consecutiveSegment, shuffledDifferent } from '../../lib/random'
import type { City } from '../../types/metro'
import type { Difficulty, OrderStopsRound } from '../../types/game'
import { resolveStopCount } from '../shared/difficulty'

export function createOrderStopsRound(
  city: City,
  difficulty: Difficulty,
  lineId?: string,
  previousRoundId?: string
): OrderStopsRound {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const resolved = getRandomRoute(city, 'order-stops', difficulty, lineId)
    const routeStops = getRouteStations(city, resolved.route)
    const stopCount = Math.max(2, resolveStopCount(routeStops.length, difficulty))
    const selectedStops =
      difficulty === 'expert' ? routeStops : consecutiveSegment(routeStops, stopCount)
    const correctStopIds = selectedStops.map((station) => station.id)
    const id = `order:${city.id}:${resolved.line.id}:${resolved.route.id}:${correctStopIds.join('-')}`

    if (id === previousRoundId && attempt < 9) {
      continue
    }

    return {
      id,
      mode: 'order-stops',
      cityId: city.id,
      lineId: resolved.line.id,
      routeId: resolved.route.id,
      promptKey: 'orderStops.prompt',
      correctStopIds,
      shuffledStops: shuffledDifferent(selectedStops)
    }
  }

  throw new Error('Could not create a different order-stops round.')
}

export function isCorrectOrder(currentStopIds: readonly string[], correctStopIds: readonly string[]): boolean {
  return (
    currentStopIds.length === correctStopIds.length &&
    currentStopIds.every((stopId, index) => stopId === correctStopIds[index])
  )
}
