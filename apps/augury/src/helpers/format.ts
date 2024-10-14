import { getUserId } from '../utils/SendToOnboarding';
export function formatValues(val: string): string {
  return `$` + parseFloat(val).toFixed(2);
}

export function parseValues(val: string): string {
  return val.replace(/^\$/, '');
}

export async function jsonifyOnboarding(array: any) {
  const id = await getUserId();
  return JSON.stringify({
    id: id,
    balance: array[0],
    defaults: {
      useCustomRisk: array[1],
      name: 'default',
      customRiskPercentage1: array[2],
      customRiskPercentage2: 100 - array[2],
    },
  });
}
