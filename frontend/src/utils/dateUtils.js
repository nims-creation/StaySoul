/**
 * Date utility functions for StaySoul
 */

/**
 * Format a date string or Date object to a human-readable string.
 * @param {string|Date} date
 * @param {object} options - Intl.DateTimeFormat options
 */
export const formatDate = (date, options = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!date) return 'TBD';
  try {
    return new Date(date).toLocaleDateString('en-US', options);
  } catch {
    return String(date);
  }
};

/**
 * Format a date to short format e.g. "Jun 3"
 */
export const formatDateShort = (date) =>
  formatDate(date, { month: 'short', day: 'numeric' });

/**
 * Format a date to long format e.g. "June 3, 2025"
 */
export const formatDateLong = (date) =>
  formatDate(date, { month: 'long', day: 'numeric', year: 'numeric' });

/**
 * Calculate the number of nights between two dates.
 * @param {string|Date} checkIn
 * @param {string|Date} checkOut
 * @returns {number}
 */
export const getNightCount = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut) - new Date(checkIn);
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
};

/**
 * Check if a date is in the past.
 * @param {string|Date} date
 */
export const isPast = (date) => date && new Date(date) < new Date();

/**
 * Get today's date as YYYY-MM-DD string.
 */
export const todayISO = () => new Date().toISOString().split('T')[0];

/**
 * Get a date N days from today as YYYY-MM-DD string.
 * @param {number} days
 */
export const daysFromNowISO = (days) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
