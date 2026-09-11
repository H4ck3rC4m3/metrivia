import type { City } from '../types/metro'

export const palma: City = {
  id: 'palma',
  nameKey: 'cities.palma',
  countryCode: 'ES',
  stations: [
    { id: 'cami-dels-reis', name: 'Camí dels Reis' },
    { id: 'estacio-intermodal-placa-despanya', name: "Estació Intermodal Plaça d'Espanya" },
    { id: 'gran-via-asima', name: 'Gran Via Asima' },
    { id: 'jacint-verdaguer', name: 'Jacint Verdaguer' },
    { id: 'parc-bit', name: 'Parc Bit' },
    { id: 'son-castello', name: 'Son Castelló' },
    { id: 'son-costa-son-fortesa', name: 'Son Costa - Son Fortesa' },
    { id: 'son-fuster-vell', name: 'Son Fuster Vell' },
    { id: 'son-sardina', name: 'Son Sardina' },
    { id: 'uib', name: 'UIB' }
  ],
  lines: [
    {
      id: 'M1',
      name: 'M1',
      color: '#fe4f06',
      textColor: '#ffffff',
      routes: [
        {
          id: 'm1-main',
          stopIds: [
            'estacio-intermodal-placa-despanya',
            'jacint-verdaguer',
            'son-costa-son-fortesa',
            'son-fuster-vell',
            'son-castello',
            'gran-via-asima',
            'cami-dels-reis',
            'son-sardina',
            'uib',
            'parc-bit'
          ]
        }
      ]
    }
  ]
}
