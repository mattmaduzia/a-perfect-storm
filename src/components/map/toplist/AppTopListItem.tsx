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
 */
export function AppTopListItem(props: AppTopListItemProps) {
  const cachedColor = useRef("");

  const highlightCounty = () => {
    const county = d3.select(`#${props.id}`);

    cachedColor.current = county.attr('fill');

    county
      .attr("fill", "#0f0")
      .attr("stroke", "#0f0").raise();

    ( d3 as any ).select(".top-list")
      .selectAll("*")
      .interrupt("top-list-enter")
      .transition(transitionStart)
      .style("opacity", 0);
  };

  const unhighlightCounty = () => {
    d3.select(`#${props.id}`)
      .attr("fill", cachedColor.current)
      .attr("stroke", null).lower();


    ( d3 as any ).select(".top-list")
      .selectAll("*")
      .interrupt("top-list-exit")
      .transition(transitionEnd)
      .style("opacity", 1);
  };

  return ( <div
      className="panel-block top-list__entry"
      onMouseDown={ highlightCounty }
      onMouseUp={ unhighlightCounty }
    >
    <span className="panel-icon is-large">
      { props.rank }
    </span>
      { props.name }: { props.value } { props.units }

    <AppLink href={`https://en.wikipedia.org/wiki/${props.name.replace(/ /g, "_")}`}>
    <span className="icon">
      <i className="mdi mdi-link" />
    </span>
    </AppLink>
    </div> );
}
