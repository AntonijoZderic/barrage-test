function Pagination({ currentPage, getCurrentPage, totalRecords, pageLimit }) {
  const LEFT_PAGE = 'LEFT';
  const RIGHT_PAGE = 'RIGHT';
  const pageNeighbours = 1;
  const totalPages = Math.ceil(totalRecords / pageLimit);

  const range = (from, to) => {
    const range = [];

    while (from <= to) {
      range.push(from);
      from++;
    }

    return range;
  };

  var fetchPageNumbers = () => {
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };
  
  const pages = fetchPageNumbers();
  
  if (totalPages <= 1) {
    return null;
  }

  return (
      <ul className="pages center">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE) return (
            <li key={index} className="page-item center" onClick={() => getCurrentPage(currentPage - (pageNeighbours * 2) - 1)}>
              &laquo;
            </li>
          );
          
          if (page === RIGHT_PAGE) return (
            <li key={index} className="page-item center" onClick={() => getCurrentPage(currentPage + (pageNeighbours * 2) + 1)}>
              &raquo;
            </li>
          );

          return (
            <li key={index} className={`${ currentPage === page ? "current-page center" : "page-item center"}`} onClick={() => getCurrentPage(page)}>
              {page}
            </li>
          );
        })}
      </ul>
    );
}

export default Pagination;