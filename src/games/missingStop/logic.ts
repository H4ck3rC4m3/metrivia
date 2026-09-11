import { getRandomRoute, getRouteStations } from '../../data/cities'
import { consecutiveSegment, sample, shuffle } from '../../lib/random'
import type { City, Station } from '../../types/metro'
import type { Difficulty, MissingStopRound } from '../../types/game'
import { difficultyConfig, resolveStopCount } from '../shared/difficulty'

function distractorPool(city: City, segment: Station[], answer: Station, hard: boolean): Station[] {
  const segmentIds = new Set(segment.map((station) => station.id))
  const basePool = city.stations.filter(
    (station) => station.id !== answer.id && (!hard || !segmentIds.has(station.id))
  )
  return basePool.length >= 3
    ? basePool
    : city.stations.filter((station) => station.id !== answer.id)
}

export function createMissingStopRound(
  city: City,
  difficulty: Difficulty,
  lineId?: string,
  previousRoundId?: string
): MissingStopRound {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const resolved = getRandomRoute(city, 'missing-stop', difficulty, lineId)
    const routeStops = getRouteStations(city, resolved.route)
    const desiredCount =
      difficulty === 'expert'
        ? routeStops.length
        : Math.min(routeStops.length, Math.max(5, Math.min(resolveStopCount(routeStops.length, difficulty), 8)))
    const segment = consecutiveSegment(routeStops, desiredCount)
    const missingIndex =
      segment.length > 2 ? 1 + Math.floor(Math.random() * (segment.length - 2)) : Math.floor(Math.random() * segment.length)
    const answer = segment[missingIndex]
    const pool = distractorPool(city, segment, answer, difficulty === 'hard' || difficulty === 'expert')
    const distractors = sample(pool, Math.min(difficultyConfig[difficulty].optionCount - 1, pool.length))
    const options = shuffle([answer, ...distractors])
    const id = `missing:${city.id}:${resolved.line.id}:${resolved.route.id}:${segment.map((stop) => stop.id).join('-')}:${answer.id}`

    if (id === previousRoundId && attempt < 9) {
      continue
    }

    return {
      id,
      mode: 'missing-stop',
      cityId: city.id,
      lineId: resolved.line.id,
      routeId: resolved.route.id,
      promptKey: 'missingStop.prompt',
      sequence: segment.map((station, index) => (index === missingIndex ? null : station)),
      answer,
      options
    }
  }

  throw new Error('Could not create a different missing-stop round.')
}

export function isMissingStopAnswer(answerId: string, round: MissingStopRound): boolean {
  return answerId === round.answer.id
}
