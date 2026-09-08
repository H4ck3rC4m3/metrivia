<script lang="ts">
  import { uiText } from '../lib/text'
  import type { ThemeMode } from '../types/game'

  export let onHome: () => void
  export let theme: ThemeMode
  export let onToggleTheme: () => void
</script>

<header class="app-header">
  <button class="brand" type="button" onclick={onHome} aria-label="Tornar a l'inici">
    <span class="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" focusable="false">
        <rect class="train-body" x="7" y="5" width="18" height="22" rx="6" />
        <path class="train-line" d="M11 11h10" />
        <circle class="train-window" cx="12" cy="17" r="2.2" />
        <circle class="train-window" cx="20" cy="17" r="2.2" />
        <path class="train-rail" d="M12 25l-3 4m11-4l3 4m-11-2h8" />
      </svg>
    </span>
    <span>{uiText.appName}</span>
  </button>
  <button
    class="theme-toggle"
    type="button"
    onclick={onToggleTheme}
    aria-label={theme === 'dark' ? uiText.switchToLight : uiText.switchToDark}
    title={theme === 'dark' ? uiText.switchToLight : uiText.switchToDark}
  >
    <span class="theme-icon" aria-hidden="true">
      <svg class="sun-icon" viewBox="0 0 24 24" focusable="false">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.8v2.4M12 18.8v2.4M4.8 4.8l1.7 1.7M17.5 17.5l1.7 1.7M2.8 12h2.4M18.8 12h2.4M4.8 19.2l1.7-1.7M17.5 6.5l1.7-1.7" />
      </svg>
      <svg class="moon-icon" viewBox="0 0 24 24" focusable="false">
        <path d="M19.2 15.6A7.9 7.9 0 0 1 8.4 4.8a8.4 8.4 0 1 0 10.8 10.8Z" />
      </svg>
    </span>
  </button>
</header>
