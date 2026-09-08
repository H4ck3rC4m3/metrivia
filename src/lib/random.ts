export function randomItem<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error('Cannot pick a random item from an empty array.')
  }
  return items[Math.floor(Math.random() * items.length)]
}

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

export function sample<T>(items: readonly T[], count: number): T[] {
  if (count > items.length) {
    throw new Error(`Cannot sample ${count} items from a list of ${items.length}.`)
  }
  return shuffle(items).slice(0, count)
}

export function consecutiveSegment<T>(items: readonly T[], count: number): T[] {
  if (count > items.length) {
    throw new Error(`Cannot create a segment of ${count} from a list of ${items.length}.`)
  }
  const start = Math.floor(Math.random() * (items.length - count + 1))
  return items.slice(start, start + count)
}

export function sameOrder<T>(left: readonly T[], right: readonly T[]): boolean {
  return left.length === right.length && left.every((item, index) => item === right[index])
}

export function shuffledDifferent<T>(items: readonly T[]): T[] {
  if (items.length < 2) {
    return [...items]
  }

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const shuffled = shuffle(items)
    if (!sameOrder(shuffled, items)) {
      return shuffled
    }
  }

  const fallback = [...items]
  ;[fallback[0], fallback[1]] = [fallback[1], fallback[0]]
  return fallback
}
