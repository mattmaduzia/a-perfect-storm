import { WeatherRecord } from "../../types/weather";
import { Feature } from "../../types/counties";

/**
 * Helper class that statically queries county data
 */
export default class FeatureSelector {
  /**
   * Checks if selected data exists for county
   * @param record Selected weather type/period
   * @param d Single county's data
   */
  public static hasData(record: WeatherRecord | null, d?: Feature): boolean {
    if (!!record) {
      const value = d?.properties?.weather?.[record.columnPeriod!]?.[record.columnType!];
      return value != null;
    }
    return false;
  }

  /**
   * Retrieves selected data for a county
   * @param record Selected weather type/period
   * @param d Single county's data
   */
  public static getData(record: WeatherRecord, d: Feature): number {
    return d.properties.weather[record.columnPeriod!][record.columnType!]!;
  }
}
