<script lang="ts">
  import type { Difficulty, GameMode, LineSelectionMode } from '../types/game'
  import type { City } from '../types/metro'
  import { getCompatibleRoutes } from '../data/cities'
  import { gameModes, uiText } from '../lib/text'
  import DifficultySelector from './DifficultySelector.svelte'
  import LineSelector from './LineSelector.svelte'

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

  $: compatibleLines = Array.from(
    new Map(getCompatibleRoutes(city, mode, difficulty).map((route) => [route.line.id, route.line])).values()
  )
  $: selectedMode = gameModes.find((candidate) => candidate.id === mode)
  $: canStart = lineSelection === 'random' || Boolean(lineId)
</script>

<section class="screen" aria-labelledby="setup-title">
  <button class="text-button" type="button" onclick={onBack}>{uiText.back}</button>
  <div class="screen-heading">
    <p class="kicker">{city.name} · {selectedMode?.name}</p>
    <h1 id="setup-title">{uiText.setup}</h1>
  </div>

  <div class="setup-panel">
    <section>
      <h2>{uiText.difficulty}</h2>
      <DifficultySelector value={difficulty} onChange={onDifficultyChange} />
    </section>

    <section>
      <h2>{uiText.line}</h2>
      {#if compatibleLines.length > 0}
        <LineSelector
          lines={compatibleLines}
          selectionMode={lineSelection}
          selectedLineId={lineId}
          onModeChange={onLineSelectionChange}
          onLineChange={onLineChange}
        />
      {:else}
        <p class="empty-state">{uiText.noCompatibleLines}</p>
      {/if}
    </section>
  </div>

  <button class="primary-action" type="button" disabled={!canStart || compatibleLines.length === 0} onclick={onStart}>
    {uiText.start}
  </button>
</section>
