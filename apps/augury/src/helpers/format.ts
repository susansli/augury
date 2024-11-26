export function formatValues(val: string): string {
  return `$` + parseFloat(val).toFixed(2);
}

export function parseValues(val: string): string {
  return val.replace(/^\$/, '');
}

export function truncateToTwoDecimals(num: number) {
  return Math.trunc(num * 100) / 100;
}

export function formatToUSD(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}