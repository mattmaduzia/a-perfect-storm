import React from "react";

export interface AppTopListSortButtonProps {
  sortAsc: boolean;
  setSortAsc: (sortAsc: boolean) => void;
}

/**
 * "Button" that changes sort orientation of top-counties list
 * @param props
 * @constructor
 */
export function AppTopListSortButton(props: AppTopListSortButtonProps) {
  return ( <span
      className="has-margin-left-10 icon" onClick={ (e: any) => {
      e.stopPropagation();
      props.setSortAsc(!props.sortAsc);
    } }
      data-testid="atlsb--wrapper"
    >
      <i
        className={ `mdi mdi-sort-${ props.sortAsc
          ? 'ascending'
          : 'descending' }` }
        data-testid="atlsb--icon"
      />
    </span> );
}
