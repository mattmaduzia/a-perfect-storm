import React, { useRef } from "react";
import * as d3 from "d3";
import { AppLink } from "../../AppLink";

export interface AppTopListItemProps {
  rank: number;
  name: string;
  value: number;
  units: string;
  id: string;
}

const transitionStart = d3.transition("top-list-enter")
  .duration(200)
  .ease(d3.easeCubic);
const transitionEnd = d3.transition("top-list-exit")
  .duration(200)
  .ease(d3.easeCubic);

/**
 * Single item in the top counties list
 * @param props
 * @constructor
 * @author Matt Maduzia
 */
export function AppTopListItem(props: AppTopListItemProps) {

  return ( <div
    className="panel-block top-list__entry"
  >
    <span className="panel-icon is-large">
      { props.rank }
    </span>
    { props.name }: { props.value } { props.units }

    <AppLink
      href={ `https://en.wikipedia.org/wiki/${ props.name.replace(
        / /g,
        "_",
      ) }` }
    >
    <span className="icon">
      <i className="mdi mdi-link"/>
    </span>
    </AppLink>
  </div> );
}
