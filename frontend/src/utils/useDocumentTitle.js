import { useEffect } from 'react';

/**
 * Custom hook to set the document title.
 * Restores the original title on component unmount.
 * @param {string} title - The page title to set
 * @param {string} [suffix='StaySoul'] - Optional suffix appended after " – "
 */
const useDocumentTitle = (title, suffix = 'StaySoul') => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} – ${suffix}` : suffix;
    return () => {
      document.title = prevTitle;
    };
  }, [title, suffix]);
};

export default useDocumentTitle;
