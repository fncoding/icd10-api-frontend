import { useEffect, useCallback } from 'react';

export function useInfinityScroll(loadMore, hasNext, loading) {
  const handleScroll = useCallback(() => {
    if (loading || !hasNext) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMore();
    }
  }, [loadMore, hasNext, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}