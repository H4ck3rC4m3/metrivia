<script lang="ts">
  import type { City } from '../types/metro'
  import { t } from '../i18n'
  import StatsStrip from './StatsStrip.svelte'
  import type { GameStats } from '../types/game'

  export let cities: City[]
  export let stats: GameStats
  export let onSelect: (cityId: string) => void
</script>

<section class="screen hero-screen" aria-labelledby="city-title">
  <div class="cover-grid">
    <div class="cover-copy">
      <p class="kicker">{$t('home.kicker')}</p>
      <h1 id="city-title">
        {#each $t('home.title').split('\n') as line, index}
          {#if index > 0}<br />{/if}{line}
        {/each}
      </h1>
      <div class="cover-line" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>

    <aside class="cover-stats">
      <StatsStrip {stats} />
    </aside>
  </div>

  <nav class="city-board" aria-label={$t('home.chooseCity')}>
    <p>{$t('home.chooseCity')}</p>
    {#each cities as city, index}
      <button class="city-route" type="button" onclick={() => onSelect(city.id)}>
        <span class="city-index">{String(index + 1).padStart(2, '0')}</span>
        <span class="city-name">{$t(city.nameKey)}</span>
        <span class="city-lines">{$t('common.linesDemo', { count: city.lines.length })}</span>
        <span class="city-track" aria-hidden="true">
          <span class="track-line"></span>
          <span class="track-node"></span>
        </span>
      </button>
    {/each}
  </nav>
</section>
