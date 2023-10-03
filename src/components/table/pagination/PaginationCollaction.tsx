interface PropsPagination<T> {
  collaction: T | undefined;
  onPageClick: (pageN: number) => void;
}

const PaginationCollaction = <T extends Record<PropertyKey, any>>({
  collaction,
  onPageClick,
}: PropsPagination<T>) => {
  const removeQuote = (label: string) => {
    return label.replace("&laquo;", "").replace("&raquo;", "");
  };

  const onMovePage = (url: string) => {
    if (url !== null) {
      const searchParams = new URL(url);
      const pageNumber = searchParams.searchParams.get("page");
      if (pageNumber !== null && !isNaN(Number(pageNumber))) {
        onPageClick(Number(pageNumber));
      }
    }
  };

  return (
    <div className="join p-2 flex justify-center items-center">
      {collaction &&
        collaction.meta.links.map((value: any, i: any) => (
          <button
            key={i}
            className={`join-item btn ${value.active ? "btn-active" : ""}`}
            onClick={() => onMovePage(value.url)}
          >
            {removeQuote(value.label)}
          </button>
        ))}
    </div>
  );
};

export default PaginationCollaction;
