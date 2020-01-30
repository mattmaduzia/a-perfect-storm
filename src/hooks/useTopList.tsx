import React, { useState } from "react";
import { WeatherTyped } from "../types/weather";
import { TopCounties } from "../types/counties";
import TopCountyLister from "../helpers/map/TopCountyLister";
import MapDeps from "../helpers/map/MapDeps";
import { WeatherType, TimePeriod } from "../types/enums";

export interface TopListHook {
  sortAsc: boolean;
  setSortAsc: (sortAsc: boolean) => void;
  topCounties: TopCounties;
}

/**
 * Hook that exposes a top-n list of the counties ranked by weather data
 * and sorted
 * @param deps Map dependencies
 * @param type Weather type
 * @param period Time period
 * @param numberShown
 * @author Matt Maduzia
 */
export function useTopList(
  deps: MapDeps,
  type: WeatherType | null,
  period: TimePeriod | null,
  numberShown?: number
): TopListHook {
  const cache = React.useRef({
    lister: null, type: null, period: null, sortAsc: false,
  } as WeatherTyped);

  const [sortAsc, setSortAsc] = useState(false);
  const [topCounties, setTopCounties] = useState(null as unknown as TopCounties);

  React.useEffect(() => {
    if (TopCountyLister.hasNewTypeAndPeriod(cache.current, type, period)) {
      const [lister, newTopList] = TopCountyLister.generateTopList(
        deps,
        type!,
        period!,
        sortAsc,
        numberShown
      );
      TopCountyLister.updateCache(cache, { type, period, lister, sortAsc });
      setTopCounties(newTopList);
    } else if (TopCountyLister.hasNewSort(cache.current, sortAsc)) {
      const newSortedTopList = TopCountyLister.generateSortedTopList(
        cache,
        sortAsc,
      );
      setTopCounties(newSortedTopList);
    }
  }, [deps, type, period, sortAsc, numberShown]);

  return { sortAsc, setSortAsc, topCounties: topCounties };
}
