import React, { useState, useCallback } from "react";
import { AppTopListItem } from "./AppTopListItem";
import { TopCountySummary } from "../../../types/weather";
import MapDeps from "../../../helpers/map/MapDeps";
import { WeatherType, TimePeriod } from "../../../types/enums";
import * as hook from "../../../hooks/useTopList";
import { AppTopListSearch } from "./AppTopListSearch";
import { AppTopListSortButton } from "./AppTopListSortButton";
import { AppTopListExpander } from "./AppTopListExpander";
import { AppPagination } from "../../layout/pagination/AppPagination";

export interface AppTopListProps {
  deps: MapDeps;
  type: WeatherType | null;
  period: TimePeriod | null;
}

/**
 * List of top-N counties by weather-type and -period
 * @param props
 * @constructor
 * @author Matt Maduzia
 */
export function AppTopList(props: AppTopListProps) {
  const { deps, type, period } = props;

  const { sortAsc, setSortAsc, topCounties } = hook.useTopList(deps,
    type,
    period,
  );

  const perPage = 20;

  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState(null as unknown as TopCountySummary[]);

  const getFilteredPageItems = useCallback(() => {
    const startItem = ( page - 1 ) * perPage;
    const endItem = startItem + perPage;
    return filtered?.slice(startItem, endItem);
  }, [filtered, page, perPage]);

  if (topCounties === null) {
    return null;
  }

  const title = `Top Counties by ${ topCounties?.title } (n=${ filtered?.length ||
  "0" })`;

  return (
    <article className="is-paddingless column is-full-touch is-full top-list panel">
      <AppTopListExpander
        sortButton={ <AppTopListSortButton
          setSortAsc={ setSortAsc }
          sortAsc={ sortAsc }
        /> }
        title={ title }
      >
        { topCounties && <AppTopListSearch
          topCounties={ topCounties }
          setFiltered={ setFiltered }
        /> }
        { filtered &&
        <AppPagination
          page={ page }
          setPage={ setPage }
          totalItems={ filtered.length }
          perPage={ perPage }
        /> }
        { filtered &&
        !!filtered.length &&
        getFilteredPageItems().map((item: TopCountySummary) => <AppTopListItem
          key={ item.name }
          name={ item.name }
          rank={ item.rank }
          id={ item.id }
          units={ topCounties.units }
          value={ item.value }
        />) }
        { filtered &&
        <AppPagination
          page={ page }
          setPage={ setPage }
          totalItems={ filtered.length }
          perPage={ perPage }
        /> }
      </AppTopListExpander>
    </article>
  );
}
