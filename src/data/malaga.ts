import type { City } from '../types/metro'

export const malaga: City = {
  id: 'malaga',
  nameKey: 'cities.malaga',
  countryCode: 'ES',
  stations: [
    { id: 'andalucia-tech', name: 'Andalucía Tech' },
    { id: 'atarazanas', name: 'Atarazanas' },
    { id: 'barbarela', name: 'Barbarela' },
    { id: 'carranque', name: 'Carranque' },
    { id: 'ciudad-de-la-justicia', name: 'Ciudad de la Justicia' },
    { id: 'clinico', name: 'Clínico' },
    { id: 'el-consul', name: 'El Cónsul' },
    { id: 'el-perchel', name: 'El Perchel' },
    { id: 'el-torcal', name: 'El Torcal' },
    { id: 'guadalmedina', name: 'Guadalmedina' },
    { id: 'la-isla', name: 'La Isla' },
    { id: 'la-luz-la-paz', name: 'La Luz-La Paz' },
    { id: 'la-union', name: 'La Unión' },
    { id: 'palacio-de-los-deportes', name: 'Palacio de los Deportes' },
    { id: 'paraninfo', name: 'Paraninfo' },
    { id: 'portada-alta', name: 'Portada Alta' },
    { id: 'princesa-huelin', name: 'Princesa-Huelin' },
    { id: 'puerta-blanca', name: 'Puerta Blanca' },
    { id: 'universidad', name: 'Universidad' },
  ],
  lines: [
    {
      id: 'l1',
      name: 'L1',
      color: '#e60000',
      textColor: '#ffffff',
      routes: [
        {
          id: 'l1-main',
          stopIds: [
            'andalucia-tech',
            'paraninfo',
            'el-consul',
            'clinico',
            'universidad',
            'ciudad-de-la-justicia',
            'portada-alta',
            'carranque',
            'barbarela',
            'la-union',
            'el-perchel',
            'guadalmedina',
            'atarazanas'
          ]
        }
      ]
    },
    {
      id: 'l2',
      name: 'L2',
      color: '#173ba0',
      textColor: '#ffffff',
      routes: [
        {
          id: 'l2-main',
          stopIds: [
            'palacio-de-los-deportes',
            'puerta-blanca',
            'la-luz-la-paz',
            'el-torcal',
            'princesa-huelin',
            'la-isla',
            'el-perchel',
            'guadalmedina'
          ]
        }
      ]
    }
  ]
}
