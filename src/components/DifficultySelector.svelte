<script lang="ts">
  import type { Difficulty } from '../types/game'
  import { t, type TranslationKey } from '../i18n'
  import { difficultyConfig } from '../games/shared/difficulty'

  export let value: Difficulty
  export let onChange: (difficulty: Difficulty) => void
  export let availableDifficulties: Difficulty[] = ['easy', 'normal', 'hard', 'expert']

  const difficultyLabels: Record<Difficulty, TranslationKey> = {
    easy: 'difficulty.easy',
    normal: 'difficulty.normal',
    hard: 'difficulty.hard',
    expert: 'difficulty.expert'
  }
  const difficulties = Object.keys(difficultyLabels) as Difficulty[]
</script>

<div class="difficulty-rail" role="group" aria-label={$t('setup.difficulty')}>
  {#each difficulties as difficulty}
    {@const available = availableDifficulties.includes(difficulty)}
    <button
      type="button"
      class:active={value === difficulty}
      disabled={!available}
      aria-pressed={value === difficulty}
      title={available ? undefined : $t('setup.unavailableDifficulty')}
      onclick={() => onChange(difficulty)}
    >
      <span>{$t(difficultyLabels[difficulty])}</span>
      <strong>
        {difficultyConfig[difficulty].stopCount === 'all'
          ? $t('difficulty.all')
          : difficultyConfig[difficulty].stopCount}
      </strong>
      <small>{$t('difficulty.stationsLabel')}</small>
      {#if !available}
        <small>{$t('setup.unavailableDifficulty')}</small>
      {/if}
    </button>
  {/each}
</div>
