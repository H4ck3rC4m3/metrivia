import type { City } from '../types/metro'

export const seville: City = {
  id: 'seville',
  nameKey: 'cities.seville',
  countryCode: 'ES',
  stations: [
    { id: 'amate', name: 'Amate' },
    { id: 'blas-infante', name: 'Blas Infante' },
    { id: 'cavaleri', name: 'Cavaleri' },
    { id: 'ciudad-expo', name: 'Ciudad Expo' },
    { id: 'cocheras', name: 'Cocheras' },
    { id: 'condequinto', name: 'Condequinto' },
    { id: 'europa', name: "Europa" },
    { id: 'gran-plaza', name: 'Gran Plaza' },
    { id: 'la-plata', name: 'La Plata' },
    { id: 'montequinto', name: 'Montequinto' },
    { id: 'nervion', name: 'Nervión' },
    { id: 'olivar-de-quintos', name: 'Olivar de Quintos' },
    { id: 'pablo-de-olavide', name: 'Pablo de Olavide' },
    { id: 'parque-de-los-principes', name: 'Parque de los Príncipes' },
    { id: 'plaza-de-cuba', name: 'Plaza de Cuba' },
    { id: 'prado-de-san-sebastian', name: 'Prado de San Sebastián' },
    { id: 'primero-de-mayo', name: '1º de Mayo' },
    { id: 'puerta-jerez', name: 'Puerta Jerez' },
    { id: 'san-bernardo', name: 'San Bernardo' },
    { id: 'san-juan-alto', name: 'San Juan Alto' },
    { id: 'san-juan-bajo', name: 'San Juan Bajo' }
  ],
  lines: [
    {
      id: 'l1',
      name: 'L1',
      color: '#008300',
      textColor: '#ffffff',
      routes: [
        {
          id: 'l1-main',
          stopIds: [
            'ciudad-expo',
            'cavaleri',
            'san-juan-alto',
            'san-juan-bajo',
            'blas-infante',
            'parque-de-los-principes',
            'plaza-de-cuba',
            'puerta-jerez',
            'prado-de-san-sebastian',
            'san-bernardo',
            'nervion',
            'gran-plaza',
            'primero-de-mayo',
            'amate',
            'la-plata',
            'cocheras',
            'pablo-de-olavide',
            'condequinto',
            'montequinto',
            'europa',
            'olivar-de-quintos'
          ]
        }
      ]
    }
  ]
}
