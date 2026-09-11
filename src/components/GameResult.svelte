<script lang="ts">
  import { t } from '../i18n'
  import type { GameStats } from '../types/game'
  import StatsStrip from './StatsStrip.svelte'

  export let correct: boolean
  export let solution: string
  export let stats: GameStats
  export let onNewRound: () => void
  export let onSetup: () => void
  export let onMode: () => void
</script>

<section class="result-panel" class:correct-result={correct} aria-live="polite">
  <div class="result-marker" aria-hidden="true"><span></span></div>
  <div class="result-copy">
    <p>{correct ? $t('result.correctDelta') : $t('result.reviewed')}</p>
    <h2>{correct ? $t('result.correct') : $t('result.incorrect')}</h2>
    <p>{solution}</p>
  </div>
  <StatsStrip {stats} />
  <div class="action-row">
    <button class="primary-action compact" type="button" onclick={onNewRound}>{$t('result.newRound')} →</button>
    <button class="secondary-action" type="button" onclick={onSetup}>{$t('result.changeSettings')}</button>
    <button class="secondary-action" type="button" onclick={onMode}>{$t('result.changeMode')}</button>
  </div>
</section>
