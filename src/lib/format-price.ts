/**
 * Format amount in Pakistani Rupees for display.
 * @param amount - Price in PKR (number, e.g. 83200)
 * @returns Formatted string e.g. "Rs. 83,200 PKR"
 */
export function formatPricePKR(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK")} PKR`;
}
