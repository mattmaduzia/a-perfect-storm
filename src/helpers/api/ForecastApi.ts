import axios, { AxiosResponse } from "axios";

import { WikiCoordinates, ForecastApiData } from "../../types/api";
import EnvironmentHelper from "../testing/EnvironmentHelper";

/**
 * Retrieves current county weather data from Weather.gov API
 */
export default class ForecastApi {
  private readonly coordinates: WikiCoordinates;

  public static readonly endpoint = "https://api.weather.gov/points/";

  constructor(coordinates: WikiCoordinates) {
    this.coordinates = coordinates;
  }

  /**
   * Gets current weather forecast data. Returns null on failure.
   */
  public async fetch(): Promise<ForecastApiData | null> {
    try {
      const stationResponse = await this.fetchStation();
      const forecastResponse = await this.fetchForecast(stationResponse);
      return forecastResponse.data.properties;
    } catch (err) {
      EnvironmentHelper.logIfNotProd("Error fetching Forecast data", err);
      return null;
    }
  }

  /**
   * Retrieves station data from which to get forecast
   */
  private async fetchStation() {
    const landingResponse = await axios.get(`${ ForecastApi.endpoint }${ this.joinCoords() }`);
    this.throwIfBadResponse(landingResponse);
    return landingResponse;
  }

  /**
   * Retrieves forecast
   * @param stationResponse
   */
  private async fetchForecast(stationResponse: AxiosResponse<any>) {
    const forecastResponse = await axios.get(stationResponse.data.properties.forecastGridData);
    this.throwIfBadResponse(forecastResponse);
    return forecastResponse;
  }

  /**
   * Checks API response code and throws error if it failed, otherwise does
   * nothing
   * @param response
   */
  private throwIfBadResponse(response: AxiosResponse): never | void {
    if (response.status >= 400) {
      throw new Error(`Received status code of ${ response.status } from Forecast API (${ response.statusText })`);
    }
  }

  /**
   * Concatenates coordinates for use in API call
   */
  private joinCoords(): string {
    return Object.values(this.coordinates).join(",");
  }
}
