import type { City } from '../types/metro'

export const moscow: City = {
  id: 'moscow',
  nameKey: 'cities.moscow',
  countryCode: 'RU',
  stations: [
    { id: 'bulvar-rokossovskogo', name: 'Bulvar Rokossovskogo' },
    { id: 'cherkizovskaya', name: 'Cherkizovskaya' },
    { id: 'preobrazhenskaya-ploshchad', name: 'Preobrazhenskaya Ploshchad' },
    { id: 'sokolniki', name: 'Sokolniki' },
    { id: 'krasnoselskaya', name: 'Krasnoselskaya' },
    { id: 'komsomolskaya', name: 'Komsomolskaya' },
    { id: 'krasnye-vorota', name: 'Krasnye Vorota' },
    { id: 'chistye-prudy', name: 'Chistye Prudy' },
    { id: 'lubyanka', name: 'Lubyanka' },
    { id: 'okhotny-ryad', name: 'Okhotny Ryad' },
    { id: 'biblioteka-imeni-lenina', name: 'Biblioteka imeni Lenina' },
    { id: 'kropotkinskaya', name: 'Kropotkinskaya' },
    { id: 'park-kultury', name: 'Park Kultury' },
    { id: 'frunzenskaya', name: 'Frunzenskaya' },
    { id: 'sportivnaya', name: 'Sportivnaya' },
    { id: 'vorobyovy-gory', name: 'Vorobyovy Gory' },
    { id: 'universitet', name: 'Universitet' },
    { id: 'rechnoy-vokzal', name: 'Rechnoy Vokzal' },
    { id: 'vodny-stadion', name: 'Vodny Stadion' },
    { id: 'voykovskaya', name: 'Voykovskaya' },
    { id: 'sokol', name: 'Sokol' },
    { id: 'aeroport', name: 'Aeroport' },
    { id: 'dinamo', name: 'Dinamo' },
    { id: 'belorusskaya', name: 'Belorusskaya' },
    { id: 'mayakovskaya', name: 'Mayakovskaya' },
    { id: 'tverskaya', name: 'Tverskaya' },
    { id: 'teatralnaya', name: 'Teatralnaya' },
    { id: 'novokuznetskaya', name: 'Novokuznetskaya' },
    { id: 'paveletskaya', name: 'Paveletskaya' },
    { id: 'avtozavodskaya', name: 'Avtozavodskaya' },
    { id: 'kolomenskaya', name: 'Kolomenskaya' },
    { id: 'kashirskaya', name: 'Kashirskaya' },
    { id: 'oktyabrskaya', name: 'Oktyabrskaya' },
    { id: 'dobryninskaya', name: 'Dobryninskaya' },
    { id: 'taganskaya', name: 'Taganskaya' },
    { id: 'kurskaya', name: 'Kurskaya' },
    { id: 'prospekt-mira', name: 'Prospekt Mira' },
    { id: 'novoslobodskaya', name: 'Novoslobodskaya' },
    { id: 'krasnopresnenskaya', name: 'Krasnopresnenskaya' },
    { id: 'kiyevskaya', name: 'Kiyevskaya' },
    { id: 'partizanskaya', name: 'Partizanskaya' },
    { id: 'semyonovskaya', name: 'Semyonovskaya' },
    { id: 'elektrozavodskaya', name: 'Elektrozavodskaya' },
    { id: 'baumanskaya', name: 'Baumanskaya' },
    { id: 'ploshchad-revolyutsii', name: 'Ploshchad Revolyutsii' },
    { id: 'arbatskaya', name: 'Arbatskaya' },
    { id: 'smolenskaya', name: 'Smolenskaya' }
  ],
  lines: [
    {
      id: 'line-1',
      name: 'L1',
      color: '#e42313',
      textColor: '#ffffff',
      routes: [
        {
          id: 'line-1-main',
          name: 'Sokolnicheskaya',
          stopIds: [
            'bulvar-rokossovskogo',
            'cherkizovskaya',
            'preobrazhenskaya-ploshchad',
            'sokolniki',
            'krasnoselskaya',
            'komsomolskaya',
            'krasnye-vorota',
            'chistye-prudy',
            'lubyanka',
            'okhotny-ryad',
            'biblioteka-imeni-lenina',
            'kropotkinskaya',
            'park-kultury',
            'frunzenskaya',
            'sportivnaya',
            'vorobyovy-gory',
            'universitet'
          ]
        }
      ]
    },
    {
      id: 'line-2',
      name: 'L2',
      color: '#4fb04f',
      textColor: '#ffffff',
      routes: [
        {
          id: 'line-2-main',
          name: 'Zamoskvoretskaya',
          stopIds: [
            'rechnoy-vokzal',
            'vodny-stadion',
            'voykovskaya',
            'sokol',
            'aeroport',
            'dinamo',
            'belorusskaya',
            'mayakovskaya',
            'tverskaya',
            'teatralnaya',
            'novokuznetskaya',
            'paveletskaya',
            'avtozavodskaya',
            'kolomenskaya',
            'kashirskaya'
          ]
        }
      ]
    },
    {
      id: 'line-3',
      name: 'L3',
      color: '#0072bc',
      textColor: '#ffffff',
      routes: [
        {
          id: 'line-3-main',
          name: 'Arbatsko-Pokrovskaya',
          stopIds: [
            'partizanskaya',
            'semyonovskaya',
            'elektrozavodskaya',
            'baumanskaya',
            'kurskaya',
            'ploshchad-revolyutsii',
            'arbatskaya',
            'smolenskaya',
            'kiyevskaya'
          ]
        }
      ]
    },
    {
      id: 'line-5',
      name: 'L5',
      color: '#8d5b2d',
      textColor: '#ffffff',
      routes: [
        {
          id: 'line-5-circle',
          name: 'Koltsevaya',
          circular: true,
          stopIds: [
            'park-kultury',
            'oktyabrskaya',
            'dobryninskaya',
            'paveletskaya',
            'taganskaya',
            'kurskaya',
            'komsomolskaya',
            'prospekt-mira',
            'novoslobodskaya',
            'belorusskaya',
            'krasnopresnenskaya',
            'kiyevskaya'
          ]
        }
      ]
    }
  ]
}
