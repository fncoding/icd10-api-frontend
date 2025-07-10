export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  hasNext, 
  hasPrevious 
}) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="join flex justify-center mt-6">
      <button 
        className={`join-item btn ${!hasPrevious ? 'btn-disabled' : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
      >
        «
      </button>
      
      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          className={`join-item btn ${
            page === currentPage ? 'btn-active' : ''
          } ${page === '...' ? 'btn-disabled' : ''}`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
      
      <button 
        className={`join-item btn ${!hasNext ? 'btn-disabled' : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
      >
        »
      </button>
    </div>
  );
}