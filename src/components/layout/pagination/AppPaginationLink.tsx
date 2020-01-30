import React from "react";

export interface AppPaginationLinkProps {
  page: number;
  isCurrent: boolean;
  setCurrent: Function;
  isDisabled: boolean;
}

/**
 * A single numbered link in a pagination component
 * @param props
 * @constructor
 * @author Matt Maduzia
 */
export function AppPaginationLink(props: AppPaginationLinkProps) {
  const handleClick = (e: any) => {
    e.preventDefault();
    props.setCurrent(props.page);
  };

  return (
    <li>
      <a
        href="#"
        onClick={handleClick}
        className={`app-pagination__number pagination-link${props.isCurrent ? ' is-current app-pagination__current' : ''}${props.isDisabled ? ' is-disabled' : ''}`}
        aria-label={`Page ${props.page}`}
        aria-current="page"
        data-testid="apag--link"
      >{props.page}</a>
    </li>
  );
}
