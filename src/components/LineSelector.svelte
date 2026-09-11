<script lang="ts">
  import type { LineSelectionMode } from '../types/game'
  import type { MetroLine } from '../types/metro'
  import { t } from '../i18n'
  import MetroLineBadge from './MetroLineBadge.svelte'

  export let lines: MetroLine[]
  export let compatibleLineIds: string[]
  export let selectionMode: LineSelectionMode
  export let selectedLineId: string | undefined
  export let onModeChange: (mode: LineSelectionMode) => void
  export let onLineChange: (lineId: string) => void
</script>

<div class="setup-stack">
  <div class="line-mode-switch" role="group" aria-label={$t('setup.line')}>
    <button
      type="button"
      class:active={selectionMode === 'random'}
      aria-pressed={selectionMode === 'random'}
      onclick={() => onModeChange('random')}
    >
      <span>{$t('setup.auto')}</span>
      {$t('setup.randomLine')}
    </button>
    <button
      type="button"
      class:active={selectionMode === 'manual'}
      aria-pressed={selectionMode === 'manual'}
      onclick={() => onModeChange('manual')}
    >
      <span>{$t('setup.manual')}</span>
      {$t('setup.manualLine')}
    </button>
  </div>

  {#if selectionMode === 'manual'}
    <div class="line-routes" role="group" aria-label={$t('setup.line')}>
      {#each lines as line}
        {@const isCompatible = compatibleLineIds.includes(line.id)}
        <button
          class="line-choice"
          class:selected={selectedLineId === line.id}
          style={`--line-choice-color: ${line.color}`}
          type="button"
          disabled={!isCompatible}
          aria-pressed={selectedLineId === line.id}
          aria-label={isCompatible
            ? `${line.name} ${line.routes[0]?.name ?? ''}`
            : `${line.name} ${line.routes[0]?.name ?? ''}. ${$t('setup.unavailableLine')}`}
          title={isCompatible ? undefined : $t('setup.unavailableLine')}
          onclick={() => onLineChange(line.id)}
        >
          <MetroLineBadge {line} />
          <span class="line-choice-track" aria-hidden="true"></span>
          <span class="line-choice-name">
            {line.routes[0]?.name ?? line.name}
            {#if !isCompatible}
              <small>{$t('setup.unavailableLine')}</small>
            {/if}
          </span>
        </button>
      {/each}
    </div>
  {/if}
</div>
