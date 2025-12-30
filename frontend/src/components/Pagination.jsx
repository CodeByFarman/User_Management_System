const Pagination = ({ page, setPage, hasMore }) => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-3 py-1">Page {page}</span>

      <button
        disabled={!hasMore}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
