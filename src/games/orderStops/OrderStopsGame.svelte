<script lang="ts">
  import { getLine, getStation } from '../../data/cities'
  import { t } from '../../i18n'
  import type { City, Station } from '../../types/metro'
  import type { GameStatus, OrderStopsRound } from '../../types/game'
  import GameResult from '../../components/GameResult.svelte'
  import MetroLineBadge from '../../components/MetroLineBadge.svelte'
  import StopTile from '../../components/StopTile.svelte'
  import type { GameStats } from '../../types/game'
  import { isCorrectOrder } from './logic'

  export let city: City
  export let round: OrderStopsRound
  export let stats: GameStats
  export let onAnswered: (correct: boolean) => void
  export let onNewRound: () => void
  export let onSetup: () => void
  export let onMode: () => void
  export let onBack: () => void

  let currentStops: Station[] = round.shuffledStops
  let status: GameStatus = 'playing'
  let activeStopId: string | null = null
  let liveMessage = ''
  let listElement: HTMLDivElement

  $: line = getLine(city, round.lineId)
  $: solution = $t('orderStops.solution', {
    stations: round.correctStopIds.map((stopId) => getStation(city, stopId).name).join(' · ')
  })

  $: if (round.id) {
    currentStops = round.shuffledStops
    status = 'playing'
    activeStopId = null
    liveMessage = ''
  }

  function moveStop(fromIndex: number, toIndex: number): void {
    if (toIndex < 0 || toIndex >= currentStops.length || fromIndex === toIndex) {
      return
    }
    const nextStops = [...currentStops]
    const [moved] = nextStops.splice(fromIndex, 1)
    nextStops.splice(toIndex, 0, moved)
    currentStops = nextStops
    liveMessage = $t('orderStops.moved', {
      station: moved.name,
      position: toIndex + 1,
      total: currentStops.length
    })
  }

  function handlePointerDown(event: PointerEvent, index: number): void {
    if (status !== 'playing') return
    activeStopId = currentStops[index].id
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: PointerEvent): void {
    if (!activeStopId || status !== 'playing') return
    const currentIndex = currentStops.findIndex((station) => station.id === activeStopId)
    if (currentIndex < 0) return

    const tiles = Array.from(listElement.querySelectorAll<HTMLButtonElement>('.stop-tile'))
    const targetIndex = tiles.findIndex((tile) => {
      const rect = tile.getBoundingClientRect()
      return event.clientY >= rect.top && event.clientY <= rect.bottom
    })

    if (targetIndex >= 0) {
      moveStop(currentIndex, targetIndex)
    }
  }

  function handlePointerEnd(): void {
    activeStopId = null
  }

  function handleKeyMove(index: number, direction: -1 | 1): void {
    moveStop(index, index + direction)
  }

  function checkAnswer(): void {
    const correct = isCorrectOrder(
      currentStops.map((station) => station.id),
      round.correctStopIds
    )
    status = correct ? 'correct' : 'incorrect'
    onAnswered(correct)
  }
</script>

<section class="screen game-screen order-screen" style={`--active-line: ${line.color}`} aria-labelledby="game-title">
  <button class="text-button" type="button" onclick={onBack}>← {$t('common.back')}</button>
  <div class="play-layout">
    <aside class="play-context">
      <div class="game-meta">
        <span>{$t(city.nameKey)}</span>
        <MetroLineBadge {line} />
      </div>
      <p class="kicker">{$t('orderStops.kicker')}</p>
      <h1 id="game-title">{$t('orderStops.title')}</h1>
      <p>{$t('orderStops.context', { count: currentStops.length })}</p>
    </aside>

    <div class="order-board">
      <div
        class="stop-list route-list"
        role="group"
        aria-label={$t('orderStops.reorderableAria')}
        bind:this={listElement}
        onpointermove={handlePointerMove}
        onpointerup={handlePointerEnd}
        onpointercancel={handlePointerEnd}
      >
        {#each currentStops as station, index (station.id)}
          <StopTile
            {station}
            {index}
            total={currentStops.length}
            disabled={status !== 'playing'}
            dragging={activeStopId === station.id}
            onPointerDown={handlePointerDown}
            onKeyMove={handleKeyMove}
          />
        {/each}
      </div>

      <p class="sr-only" aria-live="polite">{liveMessage}</p>

      {#if status === 'playing'}
        <button class="primary-action" type="button" onclick={checkAnswer}>{$t('common.check')} →</button>
      {:else}
        <GameResult
          correct={status === 'correct'}
          {solution}
          {stats}
          {onNewRound}
          onSetup={onSetup}
          onMode={onMode}
        />
      {/if}
    </div>
  </div>
</section>
