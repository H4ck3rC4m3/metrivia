# Metrodle

Metrodle és un joc web estàtic de coneixement sobre xarxes de metro. Tries una ciutat, una modalitat, una dificultat i una línia, i jugues rondes curtes sobre l'ordre o la pertinença de les parades.

## Tecnologies

- Svelte
- TypeScript
- Vite
- CSS
- GitHub Pages

## Desenvolupament local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Comprovacions

```bash
npm run check
```

## Desplegament

El projecte està configurat com a GitHub Project Page amb `base: '/metrodle/'`.

Els pushes a `main` executen `.github/workflows/deploy.yml`, que instal·la dependències, passa les comprovacions, genera `dist/` i desplega amb les accions oficials de GitHub Pages.

Al repositori de GitHub pot ser necessari activar:

`Settings -> Pages -> Source -> GitHub Actions`

## Afegir una ciutat

1. Crea un fitxer a `src/data/` amb el model `City`.
2. Defineix `stations` una sola vegada amb IDs estables, lowercase i ASCII.
3. Defineix `lines` i `routes` referenciant les estacions amb `stopIds`.
4. Registra la ciutat a `src/data/cities.ts`.
5. Executa `npm run check`; la validació de dades detecta IDs duplicats, rutes buides, parades inexistents i colors mal formats.

## Afegir una modalitat

Cada modalitat viu a `src/games/<modalitat>/` amb:

- un component Svelte per la UI;
- un `logic.ts` amb la generació i validació de ronda;
- tipus explícits a `src/types/game.ts`.

La modalitat hauria de treballar contra el model genèric de ciutat, línia, ruta i estació, sense afegir lògica específica als fitxers de dades.

## Dades

Les dades de Barcelona i Moscou incloses són subconjunts de demostració, no datasets oficials complets. Serveixen per provar totes les modalitats i l'arquitectura normalitzada, però l'aplicació no les presenta com la xarxa completa de cap ciutat.
