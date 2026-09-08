<script lang="ts">
  import { onMount } from 'svelte'
  import AppHeader from './components/AppHeader.svelte'
  import CitySelector from './components/CitySelector.svelte'
  import GameSetup from './components/GameSetup.svelte'
  import ModeSelector from './components/ModeSelector.svelte'
  import { cities, getCity, validateAllCities } from './data/cities'
  import MissingStopGame from './games/missingStop/MissingStopGame.svelte'
  import OrderStopsGame from './games/orderStops/OrderStopsGame.svelte'
  import { createRound } from './games/shared/createRound'
  import WrongStopGame from './games/wrongStop/WrongStopGame.svelte'
  import {
    loadPreferences,
    loadStats,
    loadTheme,
    recordResult,
    savePreferences,
    saveStats,
    saveTheme
  } from './lib/storage'
  import type {
    Difficulty,
    GameMode,
    GameRound,
    GameStats,
    LineSelectionMode,
    Preferences,
    ThemeMode
  } from './types/game'

  type Screen = 'city' | 'mode' | 'setup' | 'game'

  let screen: Screen = 'city'
  let preferences: Preferences = {
    cityId: 'barcelona',
    difficulty: 'normal',
    lineSelection: 'random'
  }
  let selectedMode: GameMode = 'order-stops'
  let selectedLineId: string | undefined
  let round: GameRound | null = null
  let stats: GameStats = {
    played: 0,
    correct: 0,
    currentStreak: 0,
    bestStreak: 0
  }
  let generationError = ''
  let theme: ThemeMode = 'light'

  $: selectedCity = getCity(preferences.cityId)

  onMount(() => {
    validateAllCities()
    preferences = loadPreferences()
    stats = loadStats()
    theme = loadTheme()
    applyTheme(theme)
  })

  function applyTheme(nextTheme: ThemeMode): void {
    document.documentElement.dataset.theme = nextTheme
  }

  function updatePreferences(next: Partial<Preferences>): void {
    preferences = { ...preferences, ...next }
    savePreferences(preferences)
  }

  function toggleTheme(): void {
    theme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(theme)
    saveTheme(theme)
  }

  function goHome(): void {
    screen = 'city'
    round = null
    generationError = ''
  }

  function selectCity(cityId: string): void {
    updatePreferences({ cityId })
    selectedLineId = undefined
    round = null
    screen = 'mode'
  }

  function selectMode(mode: GameMode): void {
    selectedMode = mode
    selectedLineId = undefined
    round = null
    screen = 'setup'
  }

  function setDifficulty(difficulty: Difficulty): void {
    updatePreferences({ difficulty })
    selectedLineId = undefined
  }

  function setLineSelection(lineSelection: LineSelectionMode): void {
    updatePreferences({ lineSelection })
  }

  function startRound(): void {
    generationError = ''
    try {
      const lineId = preferences.lineSelection === 'manual' ? selectedLineId : undefined
      round = createRound(selectedCity, selectedMode, preferences.difficulty, lineId, round?.id)
      screen = 'game'
    } catch (error) {
      generationError = error instanceof Error ? error.message : 'No s’ha pogut generar la ronda.'
    }
  }

  function handleAnswered(correct: boolean): void {
    stats = recordResult(stats, correct)
    saveStats(stats)
  }

  function changeSetup(): void {
    screen = 'setup'
  }

  function changeMode(): void {
    screen = 'mode'
    round = null
  }
</script>

<AppHeader onHome={goHome} {theme} onToggleTheme={toggleTheme} />

<main>
  {#if screen === 'city'}
    <CitySelector {cities} {stats} onSelect={selectCity} />
  {:else if screen === 'mode'}
    <ModeSelector city={selectedCity} onSelect={selectMode} onBack={goHome} />
  {:else if screen === 'setup'}
    <GameSetup
      city={selectedCity}
      mode={selectedMode}
      difficulty={preferences.difficulty}
      lineSelection={preferences.lineSelection}
      lineId={selectedLineId}
      onDifficultyChange={setDifficulty}
      onLineSelectionChange={setLineSelection}
      onLineChange={(lineId) => (selectedLineId = lineId)}
      onStart={startRound}
      onBack={() => (screen = 'mode')}
    />
    {#if generationError}
      <p class="app-error" role="alert">{generationError}</p>
    {/if}
  {:else if round?.mode === 'order-stops'}
    <OrderStopsGame
      city={selectedCity}
      {round}
      {stats}
      onAnswered={handleAnswered}
      onNewRound={startRound}
      onSetup={changeSetup}
      onMode={changeMode}
      onBack={changeSetup}
    />
  {:else if round?.mode === 'missing-stop'}
    <MissingStopGame
      city={selectedCity}
      {round}
      {stats}
      onAnswered={handleAnswered}
      onNewRound={startRound}
      onSetup={changeSetup}
      onMode={changeMode}
      onBack={changeSetup}
    />
  {:else if round?.mode === 'wrong-stop'}
    <WrongStopGame
      city={selectedCity}
      {round}
      {stats}
      onAnswered={handleAnswered}
      onNewRound={startRound}
      onSetup={changeSetup}
      onMode={changeMode}
      onBack={changeSetup}
    />
  {/if}
</main>
