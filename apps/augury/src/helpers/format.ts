export function formatValues(val: string): string {
  return `$` + parseFloat(val).toFixed(2);
}

export function parseValues(val: string): string {
  return val.replace(/^\$/, '');
}

export function truncateToTwoDecimals(num: number) {
  return Math.trunc(num * 100) / 100;
}