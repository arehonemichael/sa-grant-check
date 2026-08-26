export type EstimatorResult = {
  label: string;
  explanation: string;
  caveat: string;
};

/**
 * This is deliberately NOT presented as a SASSA schedule.
 * It maps ID last digits into simple early/middle/later observation groups
 * only to help users understand that payment batches can vary.
 * It should be updated or removed if you cannot support the assumptions with
 * clearly cited public information.
 */
export function estimatePaymentWindow(lastDigit: number, approvalMonth: number): EstimatorResult {
  const monthName = new Intl.DateTimeFormat('en-ZA', { month: 'long' }).format(
    new Date(2026, approvalMonth - 1, 1)
  );

  let label = 'Middle-to-later batch';
  if ([0, 1, 2, 3].includes(lastDigit)) label = 'Earlier-to-middle batch';
  if ([7, 8, 9].includes(lastDigit)) label = 'Later batch';

  return {
    label,
    explanation: `For a ${monthName} approval, this tool places ID last digit ${lastDigit} in an ${label.toLowerCase()} observation group.`,
    caveat:
      'Estimate only. This is not an official SASSA payment date, and your ID last digit does not guarantee when you will be paid. Always use your official SRD status result for the real payment information.',
  };
}
