import { useEffect } from 'react';

// Small side-effect hook for updating the browser tab title per page.
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `${title} | GameStore`;
  }, [title]);
}
