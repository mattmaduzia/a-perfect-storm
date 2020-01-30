import {
  WeatherUnits,
  WeatherTitle,
  WeatherType,
  TimePeriod,
  TypeToColumn,
  PeriodToColumn,
} from "../../types/enums";
import {
  WeatherRecord, WeatherTyped, TopCountySummary,
} from "../../types/weather";
import { Feature, TopCounties } from "../../types/counties";
import FeatureSelector from "./FeatureSelector";
import MapDeps from "./MapDeps";
import { RefObject } from "react";

/**
 * Facilitates the listing of top-N counties by weather statistic
 */
export default class TopCountyLister {
  private readonly counties: Feature[];
  private readonly type: WeatherType;
  private readonly period: TimePeriod;
  private readonly numberShown?: number;
  private sortAsc: boolean = true;

  /**
   * Checks if type and period both are supplied and don't match those
   * from previous iterations
   * @param {type, period}
   * @param newType
   * @param newPeriod
   */
  public static hasNewTypeAndPeriod({ type, period }: WeatherTyped,
    newType: WeatherType | null,
    newPeriod: TimePeriod | null,
  ): boolean {
    return !!newType &&
      !!newPeriod &&
      ( type !== newType || period !== newPeriod );
  }

  /**
   * Determines if the current sort differs from the cache
   * @param cache
   * @param sortAsc
   */
  public static hasNewSort(cache: WeatherTyped, sortAsc: boolean): boolean {
    return cache.sortAsc !== sortAsc;
  }

  /**
   * Sets the cache to most up-to-date values
   * @param cache
   * @param updated
   */
  public static updateCache(cache: RefObject<WeatherTyped>,
    updated: WeatherTyped,
  ): void {
    for (let [key, value] of Object.entries(updated)) {
      ( cache.current as any )[key] = value;
    }
  }

  /**
   * Convenience method that both creates the lister and generates the list
   * of top counties
   * @param deps
   * @param type
   * @param period
   * @param sortAsc
   * @param numberShown
   */
  public static generateTopList(deps: MapDeps,
    type: WeatherType,
    period: TimePeriod,
    sortAsc: boolean = false,
    numberShown?: number,
  ): [TopCountyLister, TopCounties] {
    const lister = new TopCountyLister(deps.counties,
      type,
      period,
      sortAsc,
      numberShown,
    );
    return [lister, lister.generateTopCounties()];
  }

  /**
   * Convenience method to update the cache, set the sort, and generate the list
   * @param cache
   * @param sortAsc
   */
  public static generateSortedTopList(cache: RefObject<WeatherTyped>,
    sortAsc: boolean,
  ): TopCounties {
    const lister = cache.current!.lister!;
    cache.current!.sortAsc = sortAsc;
    lister.setSortAsc(sortAsc);
    return lister.generateTopCounties();
  }

  public constructor(counties: Feature[],
    type: WeatherType,
    period: TimePeriod,
    sortAsc = true,
    numberShown?: number,
  ) {
    this.counties = counties;
    this.type = type;
    this.period = period;
    this.sortAsc = sortAsc;
    this.numberShown = numberShown;
  }

  public get units() {
    return WeatherUnits[this.type];
  }

  public get title() {
    return `${ WeatherTitle[this.type] } (${ this.period })`;
  }

  public setSortAsc(sortAsc: boolean): void {
    this.sortAsc = sortAsc;
  }

  /**
   * Gets feature's data based on selected type and period
   * @param d
   */
  private getData(d: Feature): number {
    return FeatureSelector.getData(this.record, d);
  }

  /**
   * Current weather-type and time-period information
   */
  private get record(): WeatherRecord {
    return {
      type: this.type,
      period: this.period,
      columnType: ( TypeToColumn as any )[this.type],
      columnPeriod: ( PeriodToColumn as any )[this.period],
    };
  }

  /**
   * Compiles a list of top counties for the selected weather type and
   * time-period
   */
  public generateTopCounties(): TopCounties {
    const filtered = this.filterNulls();
    const sorted = this.sortRemaining(filtered, this.sortAsc);
    const desiredAmount = this.takeDesiredAmount(sorted, this.numberShown);
    const summaries = this.createSummaries(desiredAmount);
    return this.compileTopCounties(summaries);
  }

  /**
   * Removes the entries that have no data for this weather-type/time-period
   */
  private filterNulls(): Feature[] {
    return this.counties.filter((value: Feature) => !!value &&
      FeatureSelector.hasData(this.record, value));
  }

  /**
   * Sorts the non-null data values either ascending or descending,
   * depending on the value of sortAsc
   * @param filtered
   * @param sortAsc
   */
  private sortRemaining(filtered: Feature[], sortAsc: boolean): Feature[] {
    return filtered.sort((a: Feature, b: Feature) => {
      const aData = this.getData(a);
      const bData = this.getData(b);

      if (aData < bData) {
        return sortAsc ? -1 : 1;
      }
      if (aData > bData) {
        return sortAsc ? 1 : -1;
      }
      return 0;
    });
  }

  /**
   * Takes the entries that will be shown
   * @param sorted
   * @param desiredAmount
   */
  private takeDesiredAmount(sorted: Feature[],
    desiredAmount?: number,
  ): Feature[] {
    return sorted.slice(0, desiredAmount);
  }

  /**
   * Creates summaries of shown entries, including value, rank, and county-name
   * @param desiredAmount
   */
  private createSummaries(desiredAmount: Feature[]): TopCountySummary[] {
    const total = desiredAmount.length;
    return desiredAmount.map((value: Feature, index: number) => {
      const data = this.getData(value);
      return {
        rank: this.sortAsc ? total - (index) : index + 1,
        name: value.properties.name,
        value: data,
        id: value.properties.key,
      };
    });
  }

  /**
   * Finishes compiling the top counties by adding a title and the units the
   * data are measured in
   * @param summary
   */
  private compileTopCounties(summary: TopCountySummary[]): TopCounties {
    return {
      summary,
      title: this.title,
      units: this.units,
      type: this.type,
      period: this.period,
      sortAsc: this.sortAsc,
    };
  }
}
