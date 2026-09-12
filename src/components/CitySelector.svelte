<script lang="ts">
  import type { City } from '../types/metro'
  import { currentLocale, t } from '../i18n'
  import StatsStrip from './StatsStrip.svelte'
  import CityName from './CityName.svelte'
  import type { GameStats } from '../types/game'

  export let cities: City[]
  export let stats: GameStats
  export let onSelect: (cityId: string) => void

  type SortKey = 'name' | 'lines'
  type SortDirection = 'asc' | 'desc'

  let sortKey: SortKey = 'name'
  let sortDirection: SortDirection = 'asc'

  function cityName(city: City): string {
    return $t(city.nameKey)
  }

  function changeSort(nextKey: SortKey): void {
    if (sortKey === nextKey) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
      return
    }

    sortKey = nextKey
    sortDirection = 'asc'
  }

  $: sortedCities = [...cities].sort((first, second) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1
    if (sortKey === 'lines') {
      const lineDifference = first.lines.length - second.lines.length
      if (lineDifference !== 0) return lineDifference * multiplier
    }

    return cityName(first).localeCompare(cityName(second), $currentLocale, { sensitivity: 'base' }) * multiplier
  })
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
    <div class="city-board-header">
      <p>{$t('home.chooseCity')}</p>
    </div>
    <div class="city-table-header" aria-label={$t('home.sortAria')}>
      <button
        class="city-column-heading"
        type="button"
        class:active={sortKey === 'name'}
        aria-pressed={sortKey === 'name'}
        onclick={() => changeSort('name')}
      >
        <span>{$t('setup.city')}</span>
        {#if sortKey === 'name'}
          <span class="sort-arrow" aria-hidden="true">{sortDirection === 'asc' ? '↑' : '↓'}</span>
        {/if}
      </button>
      <button
        class="city-column-heading city-column-lines"
        type="button"
        class:active={sortKey === 'lines'}
        aria-pressed={sortKey === 'lines'}
        onclick={() => changeSort('lines')}
      >
        <span>{$t('home.sortByLines')}</span>
        {#if sortKey === 'lines'}
          <span class="sort-arrow" aria-hidden="true">{sortDirection === 'asc' ? '↑' : '↓'}</span>
        {/if}
      </button>
    </div>
    {#each sortedCities as city}
      <button class="city-route" type="button" onclick={() => onSelect(city.id)}>
        <CityName {city} />
        <span class="city-lines">{$t('common.linesDemo', { count: city.lines.length })}</span>
        <span class="city-track" aria-hidden="true">
          <span class="track-line"></span>
          <span class="track-node"></span>
        </span>
      </button>
    {/each}
  </nav>
</section>
