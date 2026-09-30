/**
 * Format a number as Indian Rupee (INR) currency string
 * e.g. 180 -> "₹180", 1250 -> "₹1,250"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
