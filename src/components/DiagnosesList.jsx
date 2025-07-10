import { useState } from 'react';
import { usePaginatedDiagnoses } from '../hooks/usePaginatedDiagnoses';
import { useInfinityScroll } from '../hooks/useInfinityScroll';
import DiagnosesSearch from './DiagnosesSearch';

export default function DiagnosesList() {
  const [searchParams, setSearchParams] = useState({});
  const {
    data,
    loading,
    error,
    totalCount,
    hasNext,
    loadMore
  } = usePaginatedDiagnoses(searchParams);

  useInfinityScroll(loadMore, hasNext, loading);

  const hasSearchCriteria = searchParams.searchCode || searchParams.searchName;

  return (
    <div className="container mx-auto">
      {/* Sticky Search Section */}
      <div className="sticky top-16 bg-base-100 z-40 pb-4 pt-4 border-b border-base-300">
        <div className="px-4">
          <DiagnosesSearch onSearch={setSearchParams} />
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-2xl font-bold">
              ICD-10 Diagnosen
            </h1>
            <div className="text-sm text-base-content/70">
              {totalCount} {hasSearchCriteria ? 'Suchergebnisse' : 'Einträge gesamt'}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="p-4">
        {error && (
          <div className="alert alert-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Fehler beim Laden der Daten: {error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((diagnosis) => (
            <div key={diagnosis.id} className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-sm">
                  <span className="badge badge-primary">{diagnosis.icd_code_detail?.code}</span>
                  {diagnosis.title}
                </h2>
                <p className="text-xs text-base-content/70">{diagnosis.icd_code_detail?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center mt-6">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {!loading && data.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center mt-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.052 0-3.9.62-5.291 1.664M1.5 12C1.5 6.477 5.977 2 11.5 2S21.5 6.477 21.5 12s-4.477 10.5-10 10.5S1.5 17.523 1.5 12z" />
            </svg>
            <p className="text-lg text-base-content/70">
              {hasSearchCriteria ? 'Keine Ergebnisse für diese Suche gefunden.' : 'Keine Diagnosen verfügbar.'}
            </p>
            {hasSearchCriteria && (
              <p className="text-sm text-base-content/50 mt-2">
                Versuchen Sie andere Suchbegriffe oder überprüfen Sie die Schreibweise.
              </p>
            )}
          </div>
        )}

        {hasNext && !loading && (
          <div className="flex justify-center mt-6">
            <button 
              onClick={loadMore}
              className="btn btn-outline"
            >
              Mehr laden
            </button>
          </div>
        )}
      </div>
    </div>
  );
}