export const tabTitles: string[] = [
  'Set portfolio defaults',
  'Set starting balance',
  'Disclamer',
];

export enum Sectors {
  ENERGY = 'energy',
  MATERIALS = 'materials',
  INDUSTRIALS = 'industrials',
  UTILITIES = 'utilities',
  HEALTHCARE = 'health care',
  FINANCIALS = 'financials',
  DISCRETIONARY = 'consumer discretionary',
  STAPLES = 'consumer staples',
  IT = 'information technology',
  COMMUNICATION = 'communication services',
  REALESTATE = 'real estate',
}

export interface OptionType {
  label: string;
  value: string;
}

export const sectorOptions: any = [
  { value: Sectors.ENERGY, label: 'energy' },
  { value: Sectors.MATERIALS, label: 'materials' },
  { value: Sectors.INDUSTRIALS, label: 'industrials' },
  { value: Sectors.UTILITIES, label: 'utilities' },
  { value: Sectors.HEALTHCARE, label: 'health care' },
  { value: Sectors.FINANCIALS, label: 'financials' },
  { value: Sectors.DISCRETIONARY, label: 'consumer discretionary' },
  { value: Sectors.STAPLES, label: 'consumer staples' },
  { value: Sectors.IT, label: 'information technology' },
  { value: Sectors.COMMUNICATION, label: 'communication services' },
  { value: Sectors.REALESTATE, label: 'real estate' },
];
