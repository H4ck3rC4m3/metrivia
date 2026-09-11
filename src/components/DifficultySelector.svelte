<script lang="ts">
  import type { Difficulty } from '../types/game'
  import { t, type TranslationKey } from '../i18n'
  import { difficultyConfig } from '../games/shared/difficulty'

  export let value: Difficulty
  export let onChange: (difficulty: Difficulty) => void

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
    <button
      type="button"
      class:active={value === difficulty}
      aria-pressed={value === difficulty}
      onclick={() => onChange(difficulty)}
    >
      <span>{$t(difficultyLabels[difficulty])}</span>
      <strong>
        {difficultyConfig[difficulty].stopCount === 'all'
          ? $t('difficulty.all')
          : difficultyConfig[difficulty].stopCount}
      </strong>
      <small>{$t('difficulty.stationsLabel')}</small>
    </button>
  {/each}
</div>
