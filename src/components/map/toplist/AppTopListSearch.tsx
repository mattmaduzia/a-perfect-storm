import React, { useState, useRef } from "react";
import { TopCountySummary } from "../../../types/weather";
import { useSearch } from "../../../hooks/useSearch";
import { TopCounties } from "../../../types/counties";

export interface AppTopListSearchProps {
  setFiltered: (filtered: TopCountySummary[]) => void;
  topCounties: TopCounties;
}

/**
 * Search bar for top counties list
 * @param props
 * @constructor
 */
export function AppTopListSearch(props: AppTopListSearchProps) {

  const searchRef = useRef(null as any);

  const [search, setSearch] = useState("");

  useSearch(props.topCounties, props.setFiltered, search);

  const handleClear = (e: any) => {
    e.preventDefault();
    setSearch("");
    searchRef.current!.focus();
  };

  return ( <div className="top-list__search panel-block is-block">
    <div className="field has-addons">
      <p className="control is-expanded">
        <input
          value={ search }
          onChange={ (event: any) => setSearch(event.target.value.toLowerCase()) }
          className="input top-list__search-input"
          type="text"
          placeholder="Search"
          ref={ searchRef }
        />
      </p>
      <p className="control">
        <a href="#" className="button" onClick={ (event) => handleClear(event) } data-testid="atls--button">
          <span className="icon is-large">
            <i className="mdi mdi-close" aria-hidden="true"/>
          </span>
        </a>
      </p>
    </div>
  </div> );
}
