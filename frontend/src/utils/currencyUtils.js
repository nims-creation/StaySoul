/**
 * Utility for formatting currency in Indian Rupee (INR)
 * using the Indian Numbering System (e.g., 1,00,000).
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats large INR amounts compactly for space-constrained UI contexts.
 * Examples: 500 → ₹500 | 12500 → ₹12.5K | 150000 → ₹1.5L | 1200000 → ₹1.2Cr
 *
 * @param {number} amount - Amount in INR
 * @returns {string} Compact formatted string
 */
export const formatCompactCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(1)}Cr`;
  if (amount >= 100_000)    return `₹${(amount / 100_000).toFixed(1)}L`;
  if (amount >= 1_000)      return `₹${(amount / 1_000).toFixed(1)}K`;
  return `₹${amount}`;
};
