<script lang="ts">
  import type { Difficulty, GameMode, LineSelectionMode } from '../types/game'
  import type { City } from '../types/metro'
  import { getCityLines, getCompatibleRoutes } from '../data/cities'
  import { t, type TranslationKey } from '../i18n'
  import DifficultySelector from './DifficultySelector.svelte'
  import LineSelector from './LineSelector.svelte'
  import CityName from './CityName.svelte'

  export let city: City
  export let mode: GameMode
  export let difficulty: Difficulty
  export let lineSelection: LineSelectionMode
  export let lineId: string | undefined
  export let onDifficultyChange: (difficulty: Difficulty) => void
  export let onLineSelectionChange: (mode: LineSelectionMode) => void
  export let onLineChange: (lineId: string) => void
  export let onStart: () => void
  export let onBack: () => void

  const difficulties: Difficulty[] = ['easy', 'normal', 'hard', 'expert']
  $: availableDifficulties = difficulties.filter(
    (candidateDifficulty) => getCompatibleRoutes(city, mode, candidateDifficulty).length > 0
  )
  $: compatibleLines = Array.from(
    new Map(getCompatibleRoutes(city, mode, difficulty).map((route) => [route.line.id, route.line])).values()
  )
  $: allLines = getCityLines(city)
  $: compatibleLineIds = compatibleLines.map((line) => line.id)
  const modeTitleKeys: Record<GameMode, TranslationKey> = {
    'order-stops': 'mode.orderStops.title',
    'missing-stop': 'mode.missingStop.title',
    'wrong-stop': 'mode.wrongStop.title'
  }
  $: canStart =
    availableDifficulties.includes(difficulty) &&
    (lineSelection === 'random' || Boolean(lineId && compatibleLineIds.includes(lineId)))
</script>

<section class="screen setup-screen" aria-labelledby="setup-title">
  <button class="text-button" type="button" onclick={onBack}>← {$t('common.back')}</button>

  <div class="departure-board">
    <aside class="departure-context">
      <p class="kicker">{$t('setup.kicker')}</p>
      <h1 id="setup-title">{$t('setup.title')}</h1>
      <dl>
        <div>
          <dt>{$t('setup.city')}</dt>
          <dd><CityName {city} /></dd>
        </div>
        <div>
          <dt>{$t('setup.mode')}</dt>
          <dd>{$t(modeTitleKeys[mode])}</dd>
        </div>
      </dl>
    </aside>

    <div class="setup-sequence">
      <section class="setup-step">
        <span class="step-node" aria-hidden="true"></span>
        <div class="step-copy">
          <p class="step-label">{$t('setup.difficulty')}</p>
          <h2>{$t('setup.difficultyPrompt')}</h2>
        </div>
        <DifficultySelector
          value={difficulty}
          {availableDifficulties}
          onChange={onDifficultyChange}
        />
      </section>

      <section class="setup-step">
        <span class="step-node" aria-hidden="true"></span>
        <div class="step-copy">
          <p class="step-label">{$t('setup.line')}</p>
          <h2>{$t('setup.linePrompt')}</h2>
        </div>
        {#if compatibleLines.length > 0}
          <LineSelector
            lines={allLines}
            compatibleLineIds={compatibleLineIds}
            selectionMode={lineSelection}
            selectedLineId={lineId}
            onModeChange={onLineSelectionChange}
            onLineChange={onLineChange}
          />
        {:else}
          <p class="empty-state">{$t('setup.noCompatibleLines')}</p>
        {/if}
      </section>
    </div>
  </div>

  <button class="primary-action launch-action" type="button" disabled={!canStart || compatibleLines.length === 0} onclick={onStart}>
    {$t('common.start')} →
  </button>
</section>
