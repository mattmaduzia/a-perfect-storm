import { ForecastApiData, ForecastWeather } from "../../types/api";
import {
  ForecastType,
  ForecastTitle,
  ForecastUnit,
  WeatherTitle, WeatherUnits,
} from "../../types/enums";
import { TopoProperties } from "../../types/counties";
import { WeatherRecord } from "../../types/weather";

/**
 * Generates text of forecast
 */
export default class ForecastWriter {
  private readonly properties: TopoProperties;

  /**
   * Generates the forecast for output
   * @param data
   * @param type
   */
  public static writeForecast(data: ForecastApiData): string {
    const lines = ["<strong>Current Conditions</strong>"];

    for (let forecastType of Object.values(ForecastType)) {
      let line = this.getForecastLine(
        forecastType,
        data[forecastType]
      );
      if (line !== null) {
        lines.push(line);
      }
    }

    return lines.join("<br />");
  }

  /**
   * Creates a single line of the forecast from the API data
   * @param type
   * @param forecast
   * @param isCurrent
   */
  private static getForecastLine(
    type: ForecastType,
    forecast?: ForecastWeather,
    isCurrent: boolean = false,
  ): string | null {
    const title: any = ForecastTitle[type];

    if (forecast?.values?.[0]?.value === undefined) {
      return null;
    }

    const value = this.getConvertedValue(forecast);

    const unit: any = ForecastUnit[type];

    return `${title}: ${ value }${ unit }`;
  }

  /**
   * Whether the temperature is listed in Celsius, and so needs conversion
   * @param uom
   * @param values
   */
  private static getConvertedValue({ uom, values }: ForecastWeather): number {
    const value = values?.[0]?.value;

    switch (uom) {
      case "unit:degC":
        return Math.round(( value * 9 / 5 ) + 32); // fahrenheit
      case "unit:mm":
        return Math.round(value / 25.4); // inches
      case "unit:m_s-1":
        return Math.round(value * 1.944); // knots
      default:
        return value;
    }
  }

  constructor(properties: TopoProperties) {
    this.properties = properties;
  }

  /**
   * Splits "County, State" name into two separate strings
   */
  public getSplitName(): [string, string] {
    const { name } = this.properties;
    const splittingPoint = name.lastIndexOf(',');
    const asArray = name.split('');
    return [
      asArray.slice(0, splittingPoint).join(""),
      asArray.slice(splittingPoint + 1).join("")
    ];
  }

  /**
   * Retrieves the appropriate tooltip title
   * @param name
   */
  public getTitle(name: string): string {
    return `<strong>${ name }</strong>`;
  }

  /**
   * Retrieves the appropriate tooltip weather data
   * @param record
   */
  public getWeather(record: WeatherRecord | null): string {
    const { weather } = this.properties;
    let fieldValue = 'Not Recorded',
      titleType = 'None Selected',
      units = '',
      period = 'Time not selected';
    if (!!record && !!record.type && !!record.period) {
      fieldValue = ( weather as any )[record.columnPeriod!][record.columnType!];
      titleType = WeatherTitle[record.type];
      units = WeatherUnits[record.type];
      period = record.period;
    }
    return `${ titleType } (${ period }): ${ fieldValue } ${ units }`;
  }
}
