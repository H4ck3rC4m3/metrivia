<script lang="ts">
  import { numberFormatter, t } from '../i18n'
  import type { GameStats } from '../types/game'

  export let stats: GameStats
</script>

<dl class="stats-strip" aria-label={$t('stats.aria')}>
  <div>
    <dt>{$t('stats.played')}</dt>
    <dd>{$numberFormatter(stats.played)}</dd>
  </div>
  <div>
    <dt>{$t('stats.correct')}</dt>
    <dd>{$numberFormatter(stats.correct)}</dd>
  </div>
  <div>
    <dt>{$t('stats.bestStreak')}</dt>
    <dd>{$numberFormatter(stats.bestStreak)}</dd>
  </div>
</dl>
