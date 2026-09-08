<script lang="ts">
  import type { LineSelectionMode } from '../types/game'
  import type { MetroLine } from '../types/metro'
  import { uiText } from '../lib/text'
  import MetroLineBadge from './MetroLineBadge.svelte'

  export let lines: MetroLine[]
  export let selectionMode: LineSelectionMode
  export let selectedLineId: string | undefined
  export let onModeChange: (mode: LineSelectionMode) => void
  export let onLineChange: (lineId: string) => void
</script>

<div class="setup-stack">
  <div class="segmented" role="group" aria-label="Selecció de línia">
    <button
      type="button"
      class:active={selectionMode === 'random'}
      aria-pressed={selectionMode === 'random'}
      onclick={() => onModeChange('random')}
    >
      {uiText.randomLine}
    </button>
    <button
      type="button"
      class:active={selectionMode === 'manual'}
      aria-pressed={selectionMode === 'manual'}
      onclick={() => onModeChange('manual')}
    >
      {uiText.manualLine}
    </button>
  </div>

  {#if selectionMode === 'manual'}
    <div class="line-grid" role="group" aria-label="Línies disponibles">
      {#each lines as line}
        <button
          class="line-choice"
          class:selected={selectedLineId === line.id}
          type="button"
          aria-pressed={selectedLineId === line.id}
          onclick={() => onLineChange(line.id)}
        >
          <MetroLineBadge {line} />
          <span>{line.routes[0]?.name ?? line.name}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>
