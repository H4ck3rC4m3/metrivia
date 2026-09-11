<script lang="ts">
  import { getLine } from '../../data/cities'
  import { t } from '../../i18n'
  import type { GameStats, GameStatus, WrongStopRound } from '../../types/game'
  import type { City } from '../../types/metro'
  import GameResult from '../../components/GameResult.svelte'
  import MetroLineBadge from '../../components/MetroLineBadge.svelte'
  import CityName from '../../components/CityName.svelte'
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
  $: solution = $t('wrongStop.solution', { station: round.intruder.name })
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

<section class="screen game-screen intruder-screen" style={`--active-line: ${line.color}`} aria-labelledby="game-title">
  <button class="text-button" type="button" onclick={onBack}>← {$t('common.back')}</button>

  <div class="intruder-layout">
    <aside class="intruder-copy">
      <div class="game-meta">
        <CityName {city} />
        <MetroLineBadge {line} />
      </div>
      <p class="kicker">{$t('wrongStop.kicker')}</p>
      <h1 id="game-title">{$t('wrongStop.title')}</h1>
      <p>{$t('wrongStop.description')}</p>
    </aside>

    <div class="network-fragment" aria-label={$t('wrongStop.networkAria')}>
      {#each round.stops as station, index (station.id)}
        <button
          type="button"
          class="network-stop"
          class:correct={status !== 'playing' && station.id === round.intruder.id}
          class:wrong={status !== 'playing' && selectedId === station.id && station.id !== round.intruder.id}
          disabled={status !== 'playing'}
          onclick={() => choose(station.id)}
        >
          <span aria-hidden="true"></span>
          <strong>{station.name}</strong>
        </button>
      {/each}
    </div>
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
