<script lang="ts">
  import type { Station } from '../types/metro'
  import { t } from '../i18n'

  export let station: Station
  export let index = 0
  export let total = 0
  export let disabled = false
  export let dragging = false
  export let onPointerDown: (event: PointerEvent, index: number) => void
  export let onKeyMove: (index: number, direction: -1 | 1) => void
</script>

<button
  class="stop-tile"
  class:dragging
  type="button"
  disabled={disabled}
  onkeydown={(event) => {
    if (disabled) return
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      onKeyMove(index, -1)
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      onKeyMove(index, 1)
    }
  }}
  aria-label={$t('orderStops.tileAria', { station: station.name, position: index + 1, total })}
>
  <span class="handle" aria-hidden="true" onpointerdown={(event) => onPointerDown(event, index)}></span>
  <span>{station.name}</span>
</button>
