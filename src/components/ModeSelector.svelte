<script lang="ts">
  import type { GameMode } from '../types/game'
  import type { City } from '../types/metro'
  import { gameModes, uiText } from '../lib/text'

  export let city: City
  export let onSelect: (mode: GameMode) => void
  export let onBack: () => void
</script>

<section class="screen" aria-labelledby="mode-title">
  <button class="text-button" type="button" onclick={onBack}>{uiText.back}</button>
  <div class="screen-heading">
    <p class="kicker">{city.name}</p>
    <h1 id="mode-title">{uiText.chooseMode}</h1>
  </div>
  <div class="card-grid">
    {#each gameModes as mode}
      <button class="choice-card mode-card" type="button" onclick={() => onSelect(mode.id)}>
        <span>{mode.name}</span>
        <small>{mode.description}</small>
      </button>
    {/each}
  </div>
</section>
