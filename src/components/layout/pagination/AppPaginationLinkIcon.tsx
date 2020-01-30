import React from "react";

export interface AppPaginationLinkIconProps {
  page: number;
  icon: string;
  id: string;
  isDisabled: boolean;
  setCurrent: Function;
  title: string;
}

/**
 * A single icon link in a pagination component
 * @param props
 * @constructor
 */
export function AppPaginationLinkIcon(props: AppPaginationLinkIconProps) {
  const handleClick = (e: any) => {
    e.preventDefault();
    props.setCurrent(props.page);
  };

  return (
    <li>
      <a
        href="#"
        onClick={handleClick}
        className={`app-pagination__icon pagination-link${props.isDisabled ? ' is-disabled' : ''}`}
        aria-label={props.title}
        aria-current="page"
        data-testid={props.id}
      >
        <span className="icon">
          <i className={`mdi mdi-${props.icon}`} />
        </span>
      </a>
    </li>
  );
}
