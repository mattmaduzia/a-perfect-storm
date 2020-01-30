import { ForecastType } from "./enums";

export interface WikiApiData {
  image: WikiImageData;
  coordinates: WikiCoordinates;
}

export interface WikiImageData {
  source: string;
  width: number;
  height: number;
}

export interface WikiCoordinates {
  lat: number;
  lon: number;
}

export interface ForecastWeather {
  sourceUnit: string;
  uom: string,
  values: ForecastWeatherEntry[];
}

export interface ForecastWeatherEntry {
  validTime: string;
  value: number;
}

export type ApiCacheMap = Map<string, ApiCacheData>;

export interface ApiCacheData {
  wiki?: WikiApiData;
  forecast?: ForecastApiData;
  lastUpdated?: number;
}

export type ForecastApiData = {
  [K in ForecastType]: ForecastWeather;
}
