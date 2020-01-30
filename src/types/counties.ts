import { WeatherColumn, PeriodColumn, WeatherType, TimePeriod } from "./enums";
import { TopCountySummary } from "./weather";

export interface TopCounties {
  summary: TopCountySummary[];
  title: string;
  units: string;
  type: WeatherType;
  period: TimePeriod;
  sortAsc: boolean;
}

export interface TopologyWrapped {
  topology: Topology;
  adminLevels: any;
}

export interface Topology {
  type: string;
  objects: TopoObjects;
  arcs: number[][][];
  transform: TopoTransform;
  bbox: number[];
}

export interface TopoTransform {
  scale: number[];
  translate: number[];
}

export interface TopoObjects {
  counties: TopoObject;
  states: TopoObject;
}

export interface TopoObject {
  type: string;
  geometries: TopoGeometry[];
}

export interface TopoGeometry {
  type: string;
  properties: TopoProperties[];
  arcs: number[][];
}

export interface TopoProperties {
  location_id: number;
  name: string;
  key: string;
  tip?: number;
  weather: WeatherPeriods;
}

export type WeatherPeriods = {
  [K in PeriodColumn]: WeatherTypes;
}

export type WeatherTypes = {
  [K in WeatherColumn]: number | null;
}

export interface Feature {
  type: "Feature";
  properties: TopoProperties;
  geometry: FeatureGeometry;
}

export interface FeatureGeometry {
  type: string;
  coordinates: any;
}
