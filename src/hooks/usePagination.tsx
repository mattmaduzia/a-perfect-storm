import React, { useCallback } from "react";
import { AppPaginationLink } from "../components/layout/pagination/AppPaginationLink";
import { AppPaginationEllipsis } from "../components/layout/pagination/AppPaginationEllipsis";

export function usePagination(
  page: number,
  last: number,
  setCurrent: Function,
) {
  const calculateComponents = useCallback(() => {
    const components = [];

    if (last === 0) {
      return [<AppPaginationLink page={1} isCurrent={true} setCurrent={setCurrent} isDisabled={ last === 0 }/>];
    }

    const isCurrent = (pageNumber: number) => pageNumber === page;
    // middle page
    const midpoint = Math.floor(last / 2);

    // first page
    components.push(<AppPaginationLink
      page={ 1 }
      isCurrent={ isCurrent(1) }
      setCurrent={ setCurrent }
      isDisabled={ false }
    />);
    if (page - midpoint > 4) {
      components.push(<AppPaginationEllipsis/>);
      components.push(<AppPaginationLink
        page={ midpoint }
        isCurrent={ isCurrent(midpoint) }
        setCurrent={ setCurrent }
        isDisabled={ false }
      />);
    }
    // ellipsis if current > 4
    if (page > 3) {
      components.push(<AppPaginationEllipsis/>);
    }
    // previous page if current > 2
    if (page > 2) {
      components.push(<AppPaginationLink
        page={ page - 1 }
        isCurrent={ isCurrent(page - 1) }
        setCurrent={ setCurrent }
        isDisabled={ false }
      />);
    }

    // CURRENT PAGE
    if (page !== 1 && page !== last) {
      components.push(<AppPaginationLink
        page={ page }
        isCurrent={ isCurrent(page) }
        setCurrent={ setCurrent }
        isDisabled={ false }
      />);
    }
    // next page if last - current > 1
    if (last - page > 1) {
      const next = page + 1;
      components.push(<AppPaginationLink
        page={ next }
        isCurrent={ isCurrent(next) }
        setCurrent={ setCurrent }
        isDisabled={ false }
      />);
    }
    // ellipsis if last - current > 3
    if (last - page > 2) {
      components.push(<AppPaginationEllipsis/>);
    }
    if (midpoint - page > 4) {
      components.push(<AppPaginationLink
        page={ midpoint }
        isCurrent={ isCurrent(midpoint) }
        setCurrent={ setCurrent }
        isDisabled={ false }
      />);
        components.push(<AppPaginationEllipsis/>);
    }
    // last page
    if (last !== 1) {
      components.push(<AppPaginationLink
        page={ last }
        isCurrent={ isCurrent(last) }
        setCurrent={ setCurrent }
        isDisabled={ false }
      />);
    }
    return components;
  }, [page, setCurrent, last]);

  return calculateComponents();
}
