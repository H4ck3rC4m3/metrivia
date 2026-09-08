<script lang="ts">
  import { uiText } from '../lib/text'
  import type { GameStats } from '../types/game'

  export let stats: GameStats
</script>

<dl class="stats-strip" aria-label="Estadístiques locals">
  <div>
    <dt>{uiText.statsPlayed}</dt>
    <dd>{stats.played}</dd>
  </div>
  <div>
    <dt>{uiText.statsCorrect}</dt>
    <dd>{stats.correct}</dd>
  </div>
  <div>
    <dt>{uiText.bestStreak}</dt>
    <dd>{stats.bestStreak}</dd>
  </div>
</dl>
