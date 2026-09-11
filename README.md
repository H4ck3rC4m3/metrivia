# Metrivia
Benvingut a Metrivia, el joc web on posaràs a prova els teus coneixements sobre les xarxes de metro del món. Tria la teva ciutat preferida, selecciona la teva modalitat i el nivell de dificultat, i comença a jugar.

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
El projecte està configurat com a GitHub Project Page amb `base: '/metrivia/'`.

Els pushes a `main` executen `.github/workflows/deploy.yml`, que instal·la dependències, passa les comprovacions, genera `dist/` i desplega amb les accions oficials de GitHub Pages.

Al repositori de GitHub pot ser necessari activar:

`Settings -> Pages -> Source -> GitHub Actions`

## Internacionalització (i18n)
Metrivia utilitza una capa i18n interna i petita a `src/i18n/`, sense dependències externes.

Idiomes actuals:
- `ca` — Català
- `en` — English
- `es` — Español

El fallback segur és `ca`.

L'idioma inicial es resol en aquest ordre:
1. paràmetre `?lang=` de la URL, per exemple `?lang=en`;
2. preferència guardada a `localStorage`;
3. idioma del navegador, amb matching de codi base com `en-US -> en`;
4. fallback `ca`.

Canviar idioma actualitza la UI immediatament, desa la preferència, actualitza `?lang=`, i sincronitza `<html lang>`, `<html dir>`, `document.title` i la `meta description` sense recarregar la pàgina.

Per afegir francès, per exemple:
1. Crea `src/i18n/fr.ts`.
2. Copia l'estructura de claus de `src/i18n/ca.ts`.
3. Tradueix tots els valors.
4. Registra `fr` a `supportedLocales` dins `src/i18n/locales.ts`.
5. Afegeix el diccionari a `dictionaries` dins `src/i18n/index.ts`.
6. Executa `npm run check`.

Els components consumeixen claus mitjançant `$t(...)`, de manera que afegir una llengua no hauria de requerir editar components Svelte.

## Afegir una ciutat
1. Crea un fitxer a `src/data/` amb el model `City`.
2. Defineix `stations` una sola vegada amb IDs estables, lowercase i ASCII.
3. Defineix `lines` i `routes` referenciant les estacions amb `stopIds`.
4. Registra la ciutat a `src/data/cities.ts`.
5. Afegeix la clau traduïble de ciutat a `src/i18n/ca.ts`, `src/i18n/en.ts` i `src/i18n/es.ts`.
6. Executa `npm run check`; la validació de dades detecta IDs duplicats, rutes buides, parades inexistents i colors mal formats.

## Afegir una modalitat
Cada modalitat viu a `src/games/<modalitat>/` amb:
- un component Svelte per la UI;
- un `logic.ts` amb la generació i validació de ronda;
- tipus explícits a `src/types/game.ts`;
- claus traduïbles a `src/i18n/`.

La modalitat hauria de treballar contra el model genèric de ciutat, línia, ruta i estació, sense afegir lògica específica als fitxers de dades.
