<script lang="ts">
  import type { City } from '../types/metro'
  import { uiText } from '../lib/text'
  import StatsStrip from './StatsStrip.svelte'
  import type { GameStats } from '../types/game'

  export let cities: City[]
  export let stats: GameStats
  export let onSelect: (cityId: string) => void
</script>

<section class="screen hero-screen" aria-labelledby="city-title">
  <div class="hero-title">
    <p class="kicker">{uiText.appName}</p>
    <h1 id="city-title">{uiText.intro}</h1>
  </div>

  <StatsStrip {stats} />

  <div class="question-block">
    <h2>{uiText.chooseCity}</h2>
    <div class="card-grid">
      {#each cities as city}
        <button class="choice-card city-card" type="button" onclick={() => onSelect(city.id)}>
          <span>{city.name}</span>
          <small>{city.countryCode}</small>
        </button>
      {/each}
    </div>
  </div>
</section>
