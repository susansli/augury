export function formatValues(val: string): string {
  return `$` + parseFloat(val).toFixed(2);
}

export function parseValues(val: string): string {
  return val.replace(/^\$/, '');
}

// export async function jsonifyOnboarding(onboardingData: any) {
//   const id = await getUserId();
//   return JSON.stringify({
//     id: id,
//     balance: onboardingData.balance,
//     defaults: {
//       useCustomRisk: onboardingData.risk || 'false',
//       name: 'default',
//       customRiskPercentage1: onboardingData.composition,
//       customRiskPercentage2: 100 - onboardingData.composition,
//       sectorTags: onboardingData.sectors,
//     },
//   });
// }
