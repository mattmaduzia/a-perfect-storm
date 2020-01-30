import ApiCache from "./ApiCache";
import WikipediaApi from "./WikipediaApi";
import { ApiCacheData, ForecastApiData, WikiApiData } from "../../types/api";
import ForecastApi from "./ForecastApi";
import { Feature } from "../../types/counties";
import TooltipPainter from "../tooltip/TooltipPainter";
import debounce from "lodash/debounce";
import ForecastWriter from "../tooltip/ForecastWriter";
import EnvironmentHelper from "../testing/EnvironmentHelper";

/**
 * Service that handles fetching wikipedia tooltip images and current
 * weather data for county tooltips, and automatically pulls from cache if
 * possible
 */
export default class TooltipService {
  private readonly id: string;
  private readonly name: string;
  private static debouncedFetchForecast: Function | null = null;
  private static debouncedFetchWiki: Function | null = null;

  /**
   * Attempts to get the Wikipedia thumbnail from its REST API
   * (Debounced slightly to avoid unnecessary API calls)
   */
  private static async fetchWikiData(id: string, name: string): Promise<void> {
    const wiki = new WikipediaApi(name);
    const wikiData: WikiApiData | null = await wiki.fetch();
    if (wikiData !== null) {
      ApiCache.setWiki(id, wikiData);
      TooltipPainter.showThumbnail(wikiData.image);
      if (!!wikiData.coordinates) {
        TooltipService.debouncedFetchForecast!(id, wikiData);
      }
    } else {
      TooltipPainter.hideLoading();
    }
  }

  /**
   * Attempts to get the forecast data from the Weather.gov API
   * (Has a much stricter throttling policy than Wikipedia, so debounced to
   * avoid 50X errors)
   * @param id
   * @param wikiData
   */
  private static async fetchForecastData(
    id: string,
    wikiData: WikiApiData,
  ): Promise<void> {
    try {
      const forecastFetcher = new ForecastApi(wikiData.coordinates);
      const forecast = await forecastFetcher.fetch();
      if (forecast !== null) {
        ApiCache.setForecast(id, forecast);
      }
      await TooltipService.insertForecast(id, forecast!);
    } catch (err) {
      EnvironmentHelper.logIfNotProd("Error", err)
    }
  }

  /**
   * Sets forecast data to the DOM
   * @param id
   * @param forecast
   */
  private static async insertForecast(id: string | null, forecast: ForecastApiData) {
    if (TooltipPainter.current === id) {
      TooltipPainter.showLoading();
      const written = ForecastWriter.writeForecast(forecast!);
      TooltipPainter.printForecast(written);
      await TooltipPainter.refreshLocation();
    }
    TooltipPainter.hideLoading();
  }

  constructor(feature: Feature) {
    if (TooltipService.debouncedFetchWiki === null) {
      TooltipService.debouncedFetchWiki =
        debounce(TooltipService.fetchWikiData, 300);
    }
    if (TooltipService.debouncedFetchForecast === null) {
      TooltipService.debouncedFetchForecast =
        debounce(TooltipService.fetchForecastData, 500);
    }

    this.id = feature.properties.key;
    this.name = feature.properties.name;
  }

  /**
   * Public entrypoint into class, where a single county's wiki thumbnail
   * url and forecast-data will be fetched, either from an API, or if
   * possible, from the cache
   */
  public async fetchData(): Promise<void> {
    try {
      this.setThumbnailToBlank();
      if (this.isCached()) {
        this.useCachedForThumbnail();
      } else {
        this.getData();
      }
    } catch (err) {
      EnvironmentHelper.logIfNotProd("Failed fetching API data", err);
      TooltipPainter.hideLoading();
    }
  }

  /**
   * Sets thumbnail contents to default
   */
  private setThumbnailToBlank() {
    TooltipPainter.clearForecast();
    TooltipPainter.revertThumbnailToBlank();
  }

  /**
   * Determines if the entry is cached along with all required data
   */
  private isCached(): boolean {
    return ApiCache.has(this.id) &&
      ApiCache.hasWiki(this.id) &&
      ApiCache.hasForecast(this.id);
  }

  /**
   * Uses data from the cache to fill the Tooltip
   */
  private useCachedForThumbnail() {
    const cachedData = this.getCachedData()!;
    TooltipPainter.showThumbnail(cachedData.wiki?.image!);
    TooltipService.insertForecast(this.id, cachedData.forecast!);
  }

  /**
   * Rertrieves api data from the cache
   */
  private getCachedData(): ApiCacheData | undefined {
    return ApiCache.get(this.id);
  }

  /**
   * Starts API call process
   */
  private getData() {
    TooltipPainter.showLoading();
    TooltipService.debouncedFetchWiki!(this.id, this.name);
  }
}
