import * as d3 from "d3";
import { WeatherRecord } from "../../types/weather";

/**
 * Encapsulates the dispatching of a map update notification
 * (For mocking purposes)
 */
export default class MapUpdateNotifier {
  /**
   * Informs the map that it needs to update with the given weather-type/period
   * @param record
   */
  public notify(record: WeatherRecord) {
    d3.select('#map').dispatch(
      'update-weather',
      ( { detail: { record } } as any ),
    );
  }
}
