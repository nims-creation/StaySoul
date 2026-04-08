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
