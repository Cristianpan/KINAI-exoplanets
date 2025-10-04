import { ColumnSchema } from '@/interfaces/columnMapping';

export const EXOPLANET_SCHEMA: ColumnSchema[] = [
  {
    id: 'time',
    label: 'Tiempo',
    description: 'Tiempo de observación (días, horas, o timestamps)',
    required: true,
    dataType: 'number',
    example: '2451545.0'
  },
  {
    id: 'flux',
    label: 'Flujo',
    description: 'Flujo de luz observado (normalizado o en unidades específicas)',
    required: true,
    dataType: 'number',
    example: '0.9998'
  },
  {
    id: 'flux_error',
    label: 'Error de Flujo',
    description: 'Incertidumbre en la medición del flujo',
    required: true,
    dataType: 'number',
    example: '0.0001'
  },
  {
    id: 'quality_flag',
    label: 'Flag de Calidad',
    description: 'Indicador de calidad de la medición',
    required: true,
    dataType: 'number',
    example: '0'
  }
];
