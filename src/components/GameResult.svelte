<script lang="ts">
  import { uiText } from '../lib/text'
  import type { GameStats } from '../types/game'
  import StatsStrip from './StatsStrip.svelte'

  export let correct: boolean
  export let solution: string
  export let stats: GameStats
  export let onNewRound: () => void
  export let onSetup: () => void
  export let onMode: () => void
</script>

<section class="result-panel" aria-live="polite">
  <h2 class:success={correct}>{correct ? uiText.correct : uiText.incorrect}</h2>
  <p>{solution}</p>
  <StatsStrip {stats} />
  <div class="action-row">
    <button class="primary-action compact" type="button" onclick={onNewRound}>{uiText.newRound}</button>
    <button class="secondary-action" type="button" onclick={onSetup}>{uiText.changeSetup}</button>
    <button class="secondary-action" type="button" onclick={onMode}>{uiText.changeMode}</button>
  </div>
</section>
