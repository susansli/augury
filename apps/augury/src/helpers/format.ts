export function formatValues(val: string): string {
  return `$` + parseFloat(val).toFixed(2);
}

export function parseValues(val: string): string {
  return val.replace(/^\$/, '');
}