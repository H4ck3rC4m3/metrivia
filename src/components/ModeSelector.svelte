<script lang="ts">
  import type { GameMode } from '../types/game'
  import type { City } from '../types/metro'
  import { t } from '../i18n'
  import { getCompatibleRoutes } from '../data/cities'
  import CityName from './CityName.svelte'

  const gameModes = [
    {
      id: 'order-stops',
      titleKey: 'mode.orderStops.title',
      descriptionKey: 'mode.orderStops.description'
    },
    {
      id: 'missing-stop',
      titleKey: 'mode.missingStop.title',
      descriptionKey: 'mode.missingStop.description'
    },
    {
      id: 'wrong-stop',
      titleKey: 'mode.wrongStop.title',
      descriptionKey: 'mode.wrongStop.description'
    }
  ] as const

  export let city: City
  export let onSelect: (mode: GameMode) => void
  export let onBack: () => void

  const difficulties = ['easy', 'normal', 'hard', 'expert'] as const

  function isModeAvailable(mode: GameMode): boolean {
    return (
      (mode !== 'wrong-stop' || city.lines.length > 1) &&
      difficulties.some((difficulty) => getCompatibleRoutes(city, mode, difficulty).length > 0)
    )
  }

  function unavailableReason(mode: GameMode): string {
    if (mode === 'wrong-stop' && city.lines.length < 2) {
      return $t('mode.unavailableSingleLine')
    }
    return $t('mode.unavailableNoRounds')
  }
</script>

<section class="screen" aria-labelledby="mode-title">
  <button class="text-button" type="button" onclick={onBack}>← {$t('common.back')}</button>
  <div class="mode-layout">
    <div class="mode-heading">
      <p class="kicker"><CityName {city} /></p>
      <h1 id="mode-title">{$t('mode.title')}</h1>
    </div>

    <div class="mode-menu">
      {#each gameModes as mode, index}
        {@const gameMode = mode.id as GameMode}
        {@const available = isModeAvailable(gameMode)}
        <button
          class={`mode-row mode-${mode.id}`}
          type="button"
          disabled={!available}
          title={available ? undefined : unavailableReason(gameMode)}
          onclick={() => onSelect(gameMode)}
        >
          <span class="mode-number">{String(index + 1).padStart(2, '0')}</span>
          <span class="mode-copy">
            <strong>{$t(mode.titleKey)}</strong>
            <small>{$t(mode.descriptionKey)}</small>
            {#if !available}
              <small class="mode-unavailable">{unavailableReason(gameMode)}</small>
            {/if}
          </span>
          <span class="mode-diagram" aria-hidden="true">
            {#if mode.id === 'order-stops'}
              <i></i><i></i><i></i>
            {:else if mode.id === 'missing-stop'}
              <i></i><i></i><i class="missing"></i><i></i>
            {:else}
              <i></i><i></i><i class="intruder"></i><i></i>
            {/if}
          </span>
        </button>
      {/each}
    </div>
  </div>
</section>
