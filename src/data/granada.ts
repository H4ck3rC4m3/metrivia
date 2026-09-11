import type { City } from '../types/metro'

export const granada: City = {
  id: 'granada',
  nameKey: 'cities.granada',
  countryCode: 'ES',
  stations: [
    { id: 'albolote', name: 'Albolote' },
    { id: 'alcazar-genil', name: 'Alcázar Genil' },
    { id: 'andres-segovia', name: 'Andrés Segovia' },
    { id: 'anfiteatro', name: 'Anfiteatro' },
    { id: 'argentinita', name: 'Argentinita' },
    { id: 'armilla', name: 'Armilla' },
    { id: 'caleta', name: 'Caleta' },
    { id: 'cerrillo-maracena', name: 'Cerrillo Maracena' },
    { id: 'dilar', name: 'Dílar' },
    { id: 'estacion-autobuses', name: 'Estación Autobuses' },
    { id: 'estacion-ferrocarril', name: 'Estación Ferrocarril' },
    { id: 'fernando-de-los-rios', name: 'Fernando de los Ríos' },
    { id: 'hipica', name: 'Hípica' },
    { id: 'jaen', name: 'Jaén' },
    { id: 'juncaril', name: 'Juncaril' },
    { id: 'luis-amador', name: 'Luis Amador' },
    { id: 'maracena', name: 'Maracena' },
    { id: 'mendez-nunez', name: 'Méndez Núñez' },
    { id: 'nuevo-los-carmenes', name: 'Nuevo Los Cármenes' },
    { id: 'palacio-deportes', name: 'Palacio Deportes' },
    { id: 'parque-tecnologico', name: 'Parque Tecnológico' },
    { id: 'recogidas', name: 'Recogidas' },
    { id: 'sierra-nevada', name: 'Sierra Nevada' },
    { id: 'universidad', name: 'Universidad' },
    { id: 'vicuna', name: 'Vicuña' },
    { id: 'villarejo', name: 'Villarejo' }
  ],
  lines: [
    {
      id: 'l1',
      name: 'L1',
      color: '#c00b31',
      textColor: '#ffffff',
      routes: [
        {
          id: 'l1-main',
          stopIds: [
            'albolote',
            'juncaril',
            'vicuna',
            'anfiteatro',
            'maracena',
            'cerrillo-maracena',
            'estacion-autobuses',
            'jaen',
            'argentinita',
            'luis-amador',
            'villarejo',
            'caleta',
            'estacion-ferrocarril',
            'universidad',
            'mendez-nunez',
            'recogidas',
            'alcazar-genil',
            'hipica',
            'andres-segovia',
            'palacio-deportes',
            'nuevo-los-carmenes',
            'dilar',
            'parque-tecnologico',
            'sierra-nevada',
            'fernando-de-los-rios',
            'armilla'
          ]
        }
      ]
    }
  ]
}
