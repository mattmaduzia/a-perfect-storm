import {
  WeatherType, TimePeriod, WeatherColumn, PeriodColumn,
} from "./enums";
import TopCountyLister from "../helpers/map/TopCountyLister";

export interface WeatherTyped {
  lister: TopCountyLister | null;
  type: WeatherType | null;
  period: TimePeriod | null;
  sortAsc: boolean;
}

export interface WeatherRecord {
  type: WeatherType | null;
  period: TimePeriod | null;
  columnType: WeatherColumn | null;
  columnPeriod: PeriodColumn | null;
}

export interface TopCountySummary {
  rank: number;
  name: string;
  value: number;
  id: string;
}
