import type { City } from '../types/metro'

export const barcelona: City = {
  id: 'barcelona',
  name: 'Barcelona',
  countryCode: 'ES',
  stations: [
    { id: 'hospital-de-bellvitge', name: 'Hospital de Bellvitge' },
    { id: 'bellvitge', name: 'Bellvitge' },
    { id: 'av-carrilet', name: 'Av. Carrilet' },
    { id: 'rambla-just-oliveras', name: 'Rambla Just Oliveras' },
    { id: 'can-serra', name: 'Can Serra' },
    { id: 'florida', name: 'Florida' },
    { id: 'torrassa', name: 'Torrassa' },
    { id: 'santa-eulalia', name: 'Santa Eulàlia' },
    { id: 'mercat-nou', name: 'Mercat Nou' },
    { id: 'placa-de-sants', name: 'Plaça de Sants' },
    { id: 'hostafrancs', name: 'Hostafrancs' },
    { id: 'espanya', name: 'Espanya' },
    { id: 'rocafort', name: 'Rocafort' },
    { id: 'urgell', name: 'Urgell' },
    { id: 'universitat', name: 'Universitat' },
    { id: 'catalunya', name: 'Catalunya' },
    { id: 'urquinaona', name: 'Urquinaona' },
    { id: 'arc-de-triomf', name: 'Arc de Triomf' },
    { id: 'marina', name: 'Marina' },
    { id: 'glories', name: 'Glòries' },
    { id: 'clot', name: 'Clot' },
    { id: 'zona-universitaria', name: 'Zona Universitària' },
    { id: 'palau-reial', name: 'Palau Reial' },
    { id: 'maria-cristina', name: 'Maria Cristina' },
    { id: 'les-corts', name: 'Les Corts' },
    { id: 'placa-del-centre', name: 'Plaça del Centre' },
    { id: 'sants-estacio', name: 'Sants Estació' },
    { id: 'tarragona', name: 'Tarragona' },
    { id: 'poble-sec', name: 'Poble Sec' },
    { id: 'paral-lel', name: 'Paral·lel' },
    { id: 'drassanes', name: 'Drassanes' },
    { id: 'liceu', name: 'Liceu' },
    { id: 'diagonal', name: 'Diagonal' },
    { id: 'fontana', name: 'Fontana' },
    { id: 'lesseps', name: 'Lesseps' },
    { id: 'joanic', name: 'Joanic' },
    { id: 'alfons-x', name: 'Alfons X' },
    { id: 'guinardo-hospital-de-sant-pau', name: 'Guinardó | Hospital de Sant Pau' },
    { id: 'maragall', name: 'Maragall' },
    { id: 'llucmajor', name: 'Llucmajor' },
    { id: 'via-julia', name: 'Via Júlia' },
    { id: 'trinitat-nova', name: 'Trinitat Nova' },
    { id: 'collblanc', name: 'Collblanc' },
    { id: 'badal', name: 'Badal' },
    { id: 'entenca', name: 'Entença' },
    { id: 'hospital-clinic', name: 'Hospital Clínic' },
    { id: 'verdaguer', name: 'Verdaguer' },
    { id: 'sagrada-familia', name: 'Sagrada Família' },
    { id: 'sant-pau-dos-de-maig', name: 'Sant Pau | Dos de Maig' },
    { id: 'camp-de-larpa', name: "Camp de l'Arpa" },
    { id: 'sagrera', name: 'La Sagrera' },
    { id: 'congres', name: 'Congrés' },
    { id: 'virrei-amat', name: 'Virrei Amat' },
    { id: 'vilapicina', name: 'Vilapicina' },
    { id: 'horta', name: 'Horta' }
  ],
  lines: [
    {
      id: 'l1',
      name: 'L1',
      color: '#e30613',
      textColor: '#ffffff',
      routes: [
        {
          id: 'l1-main',
          stopIds: [
            'hospital-de-bellvitge',
            'bellvitge',
            'av-carrilet',
            'rambla-just-oliveras',
            'can-serra',
            'florida',
            'torrassa',
            'santa-eulalia',
            'mercat-nou',
            'placa-de-sants',
            'hostafrancs',
            'espanya',
            'rocafort',
            'urgell',
            'universitat',
            'catalunya',
            'urquinaona',
            'arc-de-triomf',
            'marina',
            'glories',
            'clot'
          ]
        }
      ]
    },
    {
      id: 'l3',
      name: 'L3',
      color: '#009739',
      textColor: '#ffffff',
      routes: [
        {
          id: 'l3-main',
          stopIds: [
            'zona-universitaria',
            'palau-reial',
            'maria-cristina',
            'les-corts',
            'placa-del-centre',
            'sants-estacio',
            'tarragona',
            'espanya',
            'poble-sec',
            'paral-lel',
            'drassanes',
            'liceu',
            'catalunya',
            'diagonal',
            'fontana',
            'lesseps'
          ]
        }
      ]
    },
    {
      id: 'l4',
      name: 'L4',
      color: '#ffcc00',
      textColor: '#1f2937',
      routes: [
        {
          id: 'l4-main',
          stopIds: [
            'diagonal',
            'verdaguer',
            'joanic',
            'alfons-x',
            'guinardo-hospital-de-sant-pau',
            'maragall',
            'llucmajor',
            'via-julia',
            'trinitat-nova'
          ]
        }
      ]
    },
    {
      id: 'l5',
      name: 'L5',
      color: '#005eb8',
      textColor: '#ffffff',
      routes: [
        {
          id: 'l5-main',
          stopIds: [
            'collblanc',
            'badal',
            'placa-de-sants',
            'sants-estacio',
            'entenca',
            'hospital-clinic',
            'diagonal',
            'verdaguer',
            'sagrada-familia',
            'sant-pau-dos-de-maig',
            'camp-de-larpa',
            'sagrera',
            'congres',
            'maragall',
            'virrei-amat',
            'vilapicina',
            'horta'
          ]
        }
      ]
    }
  ]
}
