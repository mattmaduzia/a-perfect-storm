import React, { ReactNode, useEffect } from "react";
import { AppPaginationLinkIcon } from "./AppPaginationLinkIcon";
import { usePagination } from "../../../hooks/usePagination";

export interface AppPaginationProps {
  page: number;
  setPage: Function;
  totalItems: number;
  perPage: number;
}

/**
 * A basic pagination component
 * @param props
 * @constructor
 */
export function AppPagination({ page, setPage, totalItems, perPage }: AppPaginationProps) {
  const totalPages = Math.ceil(totalItems / perPage);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
    if (page === 0) {
      setPage(1);
    }
  }, [page, totalItems, setPage, totalPages]);

  const buttons = usePagination(page, totalPages, setPage);

  return (<div className="flex panel-block justify-center">
    <nav className="pagination is-bottom-marginless" role="navigation" aria-label="pagination">
      <ul className="pagination-list">
        <AppPaginationLinkIcon
          page={ 1 }
          icon="page-first"
          title="First Page"
          isDisabled={ page === 1 }
          setCurrent={ setPage }
          id="apag--first"
        />
        <AppPaginationLinkIcon
          page={ page - 1 }
          icon="chevron-left"
          title="Previous Page"
          isDisabled={ page === 1 }
          setCurrent={ setPage }
          id="apag--prev"
        />

        {buttons && buttons.map((button: ReactNode, index: number) => <div key={`pagi${index}`}>{button}</div>)}

        <AppPaginationLinkIcon
          page={ page + 1 }
          icon="chevron-right"
          title="Next Page"
          isDisabled={ page === totalPages || totalPages === 0 }
          setCurrent={ setPage }
          id="apag--next"
        />
        <AppPaginationLinkIcon
          page={ totalPages }
          icon="page-last"
          title="Last Page"
          isDisabled={ page === totalPages || totalPages === 0 }
          setCurrent={ setPage }
          id="apag--last"
        />
      </ul>
    </nav>
  </div>);
}
