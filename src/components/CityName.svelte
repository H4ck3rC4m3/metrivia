<script lang="ts">
  import { t } from '../i18n'
  import type { City } from '../types/metro'

  export let city: City

  const assetsBase = import.meta.env.BASE_URL
</script>

<span class="city-heading">
  <span class="city-flag" aria-hidden="true">
    <img src={`${assetsBase}city-flags/${city.id}.svg`} alt="" />
  </span>
  <span class="city-name">{$t(city.nameKey)}</span>
</span>
