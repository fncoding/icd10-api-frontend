import { useState, useEffect, useCallback } from 'react';

// API-URL aus Umgebungsvariablen oder Fallback
const getApiBaseUrl = () => {
  // Wenn eine vollständige URL in der .env definiert ist, verwende diese
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Sonst baue die URL aus Host und Port zusammen
  const apiHost = import.meta.env.VITE_API_HOST || 'localhost';
  const apiPort = import.meta.env.VITE_API_PORT || '9000';
  
  return `http://${apiHost}:${apiPort}/api`;
};

const API_BASE_URL = getApiBaseUrl();

// Debug: Log the API URL (kann später entfernt werden)
console.log('Using API Base URL:', API_BASE_URL);

export function usePaginatedDiagnoses(searchParams = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchDiagnoses = useCallback(async (pageNum = 1, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        page_size: '20'
      });

      // Add search parameters if they exist
      if (searchParams.searchCode) {
        params.append('code', searchParams.searchCode);
      }
      if (searchParams.searchName) {
        params.append('name', searchParams.searchName);
      }

      const response = await fetch(`${API_BASE_URL}/diagnoses/?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      setData(prevData => append ? [...prevData, ...result.results] : result.results);
      setTotalCount(result.count);
      setHasNext(!!result.next);
      setPage(pageNum);
      
    } catch (err) {
      console.error('Error fetching diagnoses:', err);
      setError(err.message);
      if (!append) {
        setData([]);
        setTotalCount(0);
        setHasNext(false);
      }
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [searchParams]);

  const loadMore = useCallback(() => {
    if (!loading && hasNext) {
      fetchDiagnoses(page + 1, true);
    }
  }, [loading, hasNext, page, fetchDiagnoses]);

  const refresh = useCallback(() => {
    setData([]);
    setPage(1);
    setIsInitialLoad(true);
    fetchDiagnoses(1, false);
  }, [fetchDiagnoses]);

  // Effect for initial load and search parameter changes
  useEffect(() => {
    setData([]);
    setPage(1);
    setIsInitialLoad(true);
    fetchDiagnoses(1, false);
  }, [searchParams.searchCode, searchParams.searchName]);

  return {
    data,
    loading,
    error,
    totalCount,
    hasNext,
    loadMore,
    refresh,
    isInitialLoad
  };
}
