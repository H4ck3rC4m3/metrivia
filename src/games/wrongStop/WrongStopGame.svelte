<script lang="ts">
  import { getLine } from '../../data/cities'
  import type { GameStats, GameStatus, WrongStopRound } from '../../types/game'
  import type { City } from '../../types/metro'
  import GameResult from '../../components/GameResult.svelte'
  import MetroLineBadge from '../../components/MetroLineBadge.svelte'
  import { isWrongStopAnswer } from './logic'

  export let city: City
  export let round: WrongStopRound
  export let stats: GameStats
  export let onAnswered: (correct: boolean) => void
  export let onNewRound: () => void
  export let onSetup: () => void
  export let onMode: () => void
  export let onBack: () => void

  let selectedId: string | null = null
  let status: GameStatus = 'playing'

  $: line = getLine(city, round.lineId)
  $: solution = `${round.intruder.name} no pertany a aquesta línia.`
  $: if (round.id) {
    selectedId = null
    status = 'playing'
  }

  function choose(stationId: string): void {
    if (status !== 'playing') return
    selectedId = stationId
    const correct = isWrongStopAnswer(stationId, round)
    status = correct ? 'correct' : 'incorrect'
    onAnswered(correct)
  }
</script>

<section class="screen game-screen" aria-labelledby="game-title">
  <button class="text-button" type="button" onclick={onBack}>Enrere</button>
  <div class="game-meta">
    <span>{city.name}</span>
    <MetroLineBadge {line} />
  </div>
  <h1 id="game-title">{round.prompt}</h1>

  <div class="answer-grid vertical">
    {#each round.stops as station}
      <button
        type="button"
        class:correct={status !== 'playing' && station.id === round.intruder.id}
        class:wrong={status !== 'playing' && selectedId === station.id && station.id !== round.intruder.id}
        disabled={status !== 'playing'}
        onclick={() => choose(station.id)}
      >
        {station.name}
      </button>
    {/each}
  </div>

  {#if status !== 'playing'}
    <GameResult
      correct={status === 'correct'}
      {solution}
      {stats}
      {onNewRound}
      onSetup={onSetup}
      onMode={onMode}
    />
  {/if}
</section>
