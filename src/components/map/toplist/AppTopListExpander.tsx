import React, { useState } from "react";

export interface AppTopListExpanderProps {
  sortButton?: React.ReactNode;
  title: string;
  children?: React.ReactNodeArray;
}

/**
 * Container that expands to show the top county list on click
 * @param props
 * @constructor
 * @author Matt Maduzia
 */
export function AppTopListExpander(props: AppTopListExpanderProps) {
  const [active, setActive] = useState(false);

  return ( <React.Fragment>
      <p
        className="panel-heading is-accent has-text-white has-cursor-pointer"
        onClick={ () => setActive(!active) }
        data-testid="atle--expander"
      >
        <span className="icon has-text-warning">
          <i className="mdi mdi-information" />
        </span>
        { props.title }
        { props.sortButton && props.sortButton }
      </p>
      <div className={ `panel-subsection ${ active ? 'is-expanded' : '' }` } data-testid="atle--expandee">
        { props.children && props.children }
      </div>
    </React.Fragment> );
}
