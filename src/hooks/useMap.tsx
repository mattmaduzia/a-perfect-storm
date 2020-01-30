import React from "react";
import ChoroplethPainter from "../helpers/map/ChoroplethPainter";
import {
  TypeToColumn, PeriodToColumn, WeatherType, TimePeriod,
} from "../types/enums";
import { WeatherRecord } from "../types/weather";
import MapDeps from "../helpers/map/MapDeps";
import MapUpdateNotifier from "../helpers/map/MapUpdateNotifier";

export interface MapHookProps {
  deps: MapDeps;
  type: WeatherType | null;
  period: TimePeriod | null;
}

/**
 * Hook to create and update map
 * @param deps
 * @param type
 * @param period
 * @author Matt Maduzia
 */
export function useMap(
  deps: MapDeps,
  type: WeatherType | null,
  period: TimePeriod | null,
) {
  const counties = deps?.counties;
  const states = deps?.states;

  React.useEffect(() => {
    if (!!counties && !!states) {
      const painter = new ChoroplethPainter(counties, states);
      painter.paint();
    }
  }, [deps, counties, states]);

  React.useEffect(() => {
    if (!!counties && !!states && type !== null && period !== null) {
      const columnPeriod = PeriodToColumn[period] as any;
      const columnType = TypeToColumn[type] as any;
      const record: WeatherRecord = {
        type, period, columnPeriod, columnType,
      };
      const notifier = new MapUpdateNotifier();
      notifier.notify(record);
    }
  }, [deps, counties, states, type, period]);
}
