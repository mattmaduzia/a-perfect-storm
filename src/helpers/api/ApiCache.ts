/**
 * Simplistic (global) cache implementation to cut down on API calls
 */
import {
  WikiApiData, ApiCacheMap, ApiCacheData, ForecastApiData,
} from "../../types/api";

export default class ApiCache {
  private static cache: ApiCacheMap;
  public static timeToLive: number = 864 *
    (
      10 ** 5
    ); // a day in milliseconds

  /**
   * Whether a key already exists in cache
   * @param key
   */
  public static has(key: string): boolean {
    return ApiCache.cache.has(key);
  }

  /**
   * Retrieves an item by key from the cache
   * @param key
   */
  public static get(key: string): ApiCacheData | undefined {
    return ApiCache.cache.get(key);
  }

  /**
   * Puts an item key and value into the cache
   * @param key
   * @param value
   */
  public static set(key: string, value: ApiCacheData): void {
    ApiCache.cache.set(key, value);
  }

  /**
   * Checks if an existing cache item was updated within the time-to-live window
   * @param key
   */
  private static isNotStale(key: string): boolean {
    if (ApiCache.has(key)) {
      const entry = ApiCache.get(key);
      return !!entry?.lastUpdated &&
        Date.now() -
        entry.lastUpdated <
        ApiCache.timeToLive;
    }
    return false;
  }

  public static setUpdated(key: string): void {
    if (ApiCache.has(key)) {
      const entry = ApiCache.get(key);
      ApiCache.set(key, Object.assign({}, entry, { lastUpdated: Date.now() }));
    } else {
      throw new Error("Tried to update invalid cache object. Check the key.");
    }
  }

  /**
   * Whether a cache entry exists and has wiki data
   * @param key
   */
  public static hasWiki(key: string): boolean {
    if (ApiCache.isNotStale(key)) {
      const cacheEntry = ApiCache.get(key);
      return (
        !!cacheEntry?.wiki?.coordinates && !!cacheEntry?.wiki?.image
      );
    }
    return false;
  }

  /**
   * Whether a cache entry exists and has forecast data
   * @param key
   */
  public static hasForecast(key: string): boolean {
    if (ApiCache.isNotStale(key)) {
      const cacheEntry = ApiCache.get(key);
      return (
        !!cacheEntry?.forecast?.temperature
      );
    }
    return false;
  }

  /**
   * Sets the "wiki" child property of a cache entry
   * @param key
   * @param data
   */
  public static setWiki(key: string, data: WikiApiData): void {
    ApiCache.setChild(key, "wiki", data);
  }

  /**
   * Sets the "forecast" child property of a cache entry
   * @param key
   * @param data
   */
  public static setForecast(key: string, data: ForecastApiData): void {
    ApiCache.setChild(key, "forecast", data);
  }

  /**
   * Wipes the cache
   */
  public static clear(): void {
    ApiCache.cache.clear();
  }

  /**
   * Saves a copy of the cache to local storage
   */
  public static store(): void {
    localStorage.setItem(
      "apiCache",
      JSON.stringify(Array.from(ApiCache.cache)),
    );
  }

  /**
   * Restores the local copy of the cache if it exists
   */
  public static hydrate(): void {
    const cache = localStorage.getItem("apiCache");
    if (cache !== null) {
      ApiCache.cache = new Map(JSON.parse(cache));
    } else {
      ApiCache.init();
    }
  }

  public static init(): void {
    ApiCache.cache = new Map();
  }

  /**
   * Sets the child property of a cache entry
   * @param key
   * @param childKey
   * @param data
   */
  private static setChild(key: string,
    childKey: string,
    data: WikiApiData | ForecastApiData,
  ): void {
    const otherKey = childKey === "wiki" ? "forecast" : "wiki";
    const current = ApiCache.has(key) ? ApiCache.get(key) : { lastUpdated: Date.now(), [otherKey]: null };
    ApiCache.set(key, Object.assign({}, current, { [childKey]: data }));
  }
}
