<script lang="ts">
  import type { Difficulty } from '../types/game'
  import { difficultyLabels } from '../lib/text'

  export let value: Difficulty
  export let onChange: (difficulty: Difficulty) => void

  const difficulties = Object.keys(difficultyLabels) as Difficulty[]
</script>

<div class="segmented" role="group" aria-label="Dificultat">
  {#each difficulties as difficulty}
    <button
      type="button"
      class:active={value === difficulty}
      aria-pressed={value === difficulty}
      onclick={() => onChange(difficulty)}
    >
      {difficultyLabels[difficulty]}
    </button>
  {/each}
</div>
