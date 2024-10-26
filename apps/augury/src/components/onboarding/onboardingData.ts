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
  { value: Sectors.ENERGY, label: 'Energy' },
  { value: Sectors.MATERIALS, label: 'Materials' },
  { value: Sectors.INDUSTRIALS, label: 'Industrials' },
  { value: Sectors.UTILITIES, label: 'Utilities' },
  { value: Sectors.HEALTHCARE, label: 'Health Care' },
  { value: Sectors.FINANCIALS, label: 'Financials' },
  { value: Sectors.DISCRETIONARY, label: 'Consumer Discretionary' },
  { value: Sectors.STAPLES, label: 'Consumer Staples' },
  { value: Sectors.IT, label: 'Information Technology' },
  { value: Sectors.COMMUNICATION, label: 'Communication Services' },
  { value: Sectors.REALESTATE, label: 'Real Estate' },
];
