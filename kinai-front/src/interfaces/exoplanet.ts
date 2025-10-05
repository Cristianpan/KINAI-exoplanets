export interface Exoplanet {
  id: string;
  name: string;
  type: string;
  radius: number; // in Earth radii
  temperature: number; // in Kelvin
  orbitalPeriod: number; // in days
  isVerified: boolean;
  habitability?: string; // e.g., "Potencialmente Habitable"
  planetType?: string; // e.g., "Super Earth"
  points: number[];
}
