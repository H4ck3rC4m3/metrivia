<script lang="ts">
  import type { MetroLine } from '../types/metro'

  export let line: MetroLine
</script>

<span
  class="line-badge"
  style={`--line-color: ${line.color}; --line-text: ${line.textColor ?? '#ffffff'}`}
>
  {line.name}
</span>
