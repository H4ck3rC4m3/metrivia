<script lang="ts">
  import { getLine } from '../../data/cities'
  import { t } from '../../i18n'
  import type { GameStats, GameStatus, MissingStopRound } from '../../types/game'
  import type { City } from '../../types/metro'
  import GameResult from '../../components/GameResult.svelte'
  import MetroLineBadge from '../../components/MetroLineBadge.svelte'
  import CityName from '../../components/CityName.svelte'
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
  $: solution = $t('missingStop.solution', { station: round.answer.name })
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

<section class="screen game-screen missing-screen" style={`--active-line: ${line.color}`} aria-labelledby="game-title">
  <button class="text-button" type="button" onclick={onBack}>← {$t('common.back')}</button>

  <div class="missing-layout">
    <header class="missing-header">
      <div class="game-meta">
        <CityName {city} />
        <MetroLineBadge {line} />
      </div>
      <p class="kicker">{$t('missingStop.kicker')}</p>
      <h1 id="game-title">{$t('missingStop.title')}</h1>
    </header>

    <ol class="missing-route" aria-label={$t('missingStop.routeAria')}>
      {#each round.sequence as station}
        <li class:missing={!station}>
          <span class="route-node" aria-hidden="true"></span>
          <span>{station?.name ?? '?'}</span>
        </li>
      {/each}
    </ol>

    <div class="answer-column" aria-label={$t('missingStop.optionsAria')}>
      {#each round.options as option, index}
        <button
          type="button"
          class:correct={status !== 'playing' && option.id === round.answer.id}
          class:wrong={status !== 'playing' && selectedId === option.id && option.id !== round.answer.id}
          disabled={status !== 'playing'}
          onclick={() => choose(option.id)}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          {option.name}
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
