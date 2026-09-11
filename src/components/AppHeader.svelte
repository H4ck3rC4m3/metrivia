<script lang="ts">
  import { currentLocale, setLocale, supportedLocales, t, type Locale } from '../i18n'
  import type { ThemeMode } from '../types/game'

  export let onHome: () => void
  export let theme: ThemeMode
  export let onToggleTheme: () => void

  const localeOptions = Object.values(supportedLocales)
</script>

<header class="app-header">
  <button class="brand" type="button" onclick={onHome} aria-label={$t('common.homeAria')}>
    <span class="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" focusable="false">
        <rect class="train-body" x="7" y="5" width="18" height="22" rx="6" />
        <path class="train-line" d="M11 11h10" />
        <circle class="train-window" cx="12" cy="17" r="2.2" />
        <circle class="train-window" cx="20" cy="17" r="2.2" />
        <path class="train-rail" d="M12 25l-3 4m11-4l3 4m-11-2h8" />
      </svg>
    </span>
    <span>{$t('app.name')}</span>
  </button>
  <div class="header-actions">
    <div class="language-switcher" role="group" aria-label={$t('common.changeLanguage')}>
      {#each localeOptions as locale}
        <button
          type="button"
          class:active={$currentLocale === locale.code}
          aria-pressed={$currentLocale === locale.code}
          aria-label={`${$t('common.changeLanguage')}: ${locale.name}`}
          onclick={() => setLocale(locale.code as Locale)}
        >
          <span>{locale.shortName}</span>
          <strong>{locale.name}</strong>
        </button>
      {/each}
    </div>
    <button
      class="theme-toggle"
      type="button"
      onclick={onToggleTheme}
      aria-label={theme === 'dark' ? $t('common.switchToLight') : $t('common.switchToDark')}
      title={theme === 'dark' ? $t('common.switchToLight') : $t('common.switchToDark')}
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
  </div>
</header>
