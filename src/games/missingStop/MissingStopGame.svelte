<script lang="ts">
  import { getLine } from '../../data/cities'
  import type { GameStats, GameStatus, MissingStopRound } from '../../types/game'
  import type { City } from '../../types/metro'
  import GameResult from '../../components/GameResult.svelte'
  import MetroLineBadge from '../../components/MetroLineBadge.svelte'
  import { isMissingStopAnswer } from './logic'

  export let city: City
  export let round: MissingStopRound
  export let stats: GameStats
  export let onAnswered: (correct: boolean) => void
  export let onNewRound: () => void
  export let onSetup: () => void
  export let onMode: () => void
  export let onBack: () => void

  let selectedId: string | null = null
  let status: GameStatus = 'playing'

  $: line = getLine(city, round.lineId)
  $: solution = `La parada que faltava era ${round.answer.name}.`
  $: if (round.id) {
    selectedId = null
    status = 'playing'
  }

  function choose(stationId: string): void {
    if (status !== 'playing') return
    selectedId = stationId
    const correct = isMissingStopAnswer(stationId, round)
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

  <ol class="sequence-list">
    {#each round.sequence as station}
      <li class:missing={!station}>{station?.name ?? '???'}</li>
    {/each}
  </ol>

  <div class="answer-grid">
    {#each round.options as option}
      <button
        type="button"
        class:correct={status !== 'playing' && option.id === round.answer.id}
        class:wrong={status !== 'playing' && selectedId === option.id && option.id !== round.answer.id}
        disabled={status !== 'playing'}
        onclick={() => choose(option.id)}
      >
        {option.name}
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
