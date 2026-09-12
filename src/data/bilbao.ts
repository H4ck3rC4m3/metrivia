import type { City } from '../types/metro'

export const bilbao: City = {
  id: 'bilbao',
  nameKey: 'cities.bilbao',
  countryCode: 'ES',
  stations: [
    { id: 'abando', name: 'Abando' },
    { id: 'abatxolo', name: 'Abatxolo' },
    { id: 'aiboa', name: 'Aiboa' },
    { id: 'algorta', name: 'Algorta' },
    { id: 'ansio', name: 'Ansio' },
    { id: 'areeta', name: 'Areeta' },
    { id: 'ariz', name: 'Ariz' },
    { id: 'astrabudua', name: 'Astrabudua' },
    { id: 'bagatza', name: 'Bagatza' },
    { id: 'barakaldo', name: 'Barakaldo' },
    { id: 'basarrate', name: 'Basarrate' },
    { id: 'basauri', name: 'Basauri' },
    { id: 'berango', name: 'Berango' },
    { id: 'bidezabal', name: 'Bidezabal' },
    { id: 'bolueta', name: 'Bolueta' },
    { id: 'deustu', name: 'Deustu' },
    { id: 'erandio', name: 'Erandio' },
    { id: 'etxebarri', name: 'Etxebarri' },
    { id: 'gobela', name: 'Gobela' },
    { id: 'gurutzeta-cruces', name: 'Gurutzeta/Cruces' },
    { id: 'ibarbengoa', name: 'Ibarbengoa' },
    { id: 'indautxu', name: 'Indautxu' },
    { id: 'kabiezes', name: 'Kabiezes' },
    { id: 'kukullaga-etxebarri', name: 'Kukullaga/Etxebarri' },
    { id: 'lamiako', name: 'Lamiako' },
    { id: 'larrabasterra', name: 'Larrabasterra' },
    { id: 'leioa', name: 'Leioa' },
    { id: 'lutxana', name: 'Lutxana' },
    { id: 'matiko', name: 'Matiko' },
    { id: 'moyua', name: 'Moyua' },
    { id: 'neguri', name: 'Neguri' },
    { id: 'otxarkoaga', name: 'Otxarkoaga' },
    { id: 'penota', name: 'Peñota' },
    { id: 'plentzia', name: 'Plentzia' },
    { id: 'portugalete', name: 'Portugalete' },
    { id: 'san-ignazio', name: 'San Ignazio' },
    { id: 'santimami-san-mames', name: 'Santimami/San Mamés' },
    { id: 'santurtzi', name: 'Santurtzi' },
    { id: 'santutxu', name: 'Santutxu' },
    { id: 'sarriko', name: 'Sarriko' },
    { id: 'sestao', name: 'Sestao' },
    { id: 'sopela', name: 'Sopela' },
    { id: 'txurdinaga', name: 'Txurdinaga' },
    { id: 'urbinaga', name: 'Urbinaga' },
    { id: 'urduliz', name: 'Urduliz' },
    { id: 'uribarri', name: 'Uribarri' },
    { id: 'zazpikaleak-casco-viejo', name: 'Zazpikaleak/Casco Viejo' },
    { id: 'zurbaranbarri', name: 'Zurbaranbarri' }
  ],
  lines: [
    {
      id: 'l1',
      name: 'L1',
      color: '#f14625',
      textColor: '#ffffff',
      routes: [
        {
          id: 'l1-main',
          stopIds: [
            'plentzia',
            'urduliz',
            'sopela',
            'larrabasterra',
            'berango',
            'ibarbengoa',
            'bidezabal',
            'algorta',
            'aiboa',
            'neguri',
            'gobela',
            'areeta',
            'lamiako',
            'leioa',
            'astrabudua',
            'erandio',
            'lutxana',
            'san-ignazio',
            'sarriko',
            'deustu',
            'santimami-san-mames',
            'indautxu',
            'moyua',
            'abando',
            'zazpikaleak-casco-viejo',
            'santutxu',
            'basarrate',
            'bolueta',
            'etxebarri'
          ]
        }
      ]
    },
    {
      id: 'l2',
      name: 'L2',
      color: '#1f1e21',
      textColor: '#ffffff',
      routes: [
        {
          id: 'l2-main',
          stopIds: [
            'kabiezes',
            'santurtzi',
            'penota',
            'portugalete',
            'abatxolo',
            'sestao',
            'urbinaga',
            'bagatza',
            'barakaldo',
            'ansio',
            'gurutzeta-cruces',
            'san-ignazio',
            'sarriko',
            'deustu',
            'santimami-san-mames',
            'indautxu',
            'moyua',
            'abando',
            'zazpikaleak-casco-viejo',
            'santutxu',
            'basarrate',
            'bolueta',
            'etxebarri',
            'ariz',
            'basauri'
          ]
        }
      ]
    },
    {
      id: 'l3',
      name: 'L3',
      color: '#e10d7b',
      textColor: '#ffffff',
      routes: [
        {
          id: 'l3-main',
          stopIds: [
            'matiko',
            'uribarri',
            'zazpikaleak-casco-viejo',
            'zurbaranbarri',
            'txurdinaga',
            'otxarkoaga',
            'kukullaga-etxebarri'
          ]
        }
      ]
    }
  ]
}
