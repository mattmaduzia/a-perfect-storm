import {
  TimePeriod, WeatherType, WeatherColumn, PeriodColumn,
} from "../../../types/enums";
import { WeatherRecord } from "../../../types/weather";
import { Feature } from "../../../types/counties";
import FeatureSelector from "../FeatureSelector";

describe("Helper class that statically queries county data", () => {
  test.each([
    [
      {
        period: TimePeriod.Annual,
        type: WeatherType.SnowDepth5,
        columnType: WeatherColumn.snow_depth_5,
        columnPeriod: PeriodColumn.annual,
      }, {
      properties: {
        weather: {
          annual: {
            snow_depth_5: 0.5,
          },
        },
      },
    }, true,
    ], [
      {
        period: TimePeriod.Annual,
        type: WeatherType.SnowDepth5,
        columnType: WeatherColumn.snow_depth_5,
        columnPeriod: PeriodColumn.annual,
      }, {
        properties: {
          weather: {
            annual: {
              snow_depth_5: null,
            },
          },
        },
      }, false,
    ], [
      {
        period: TimePeriod.Annual,
        type: WeatherType.SnowDepth5,
        columnType: WeatherColumn.snow_depth_5,
        columnPeriod: PeriodColumn.annual,
      }, {
        properties: {
          weather: {
            annual: null,
          },
        },
      }, false,
    ], [
      {
        period: TimePeriod.Annual,
        type: WeatherType.SnowDepth5,
        columnType: WeatherColumn.snow_depth_5,
        columnPeriod: PeriodColumn.annual,
      }, {
        properties: {
          weather: null,
        },
      }, false,
    ], [
      {
        period: TimePeriod.Annual,
        type: WeatherType.SnowDepth5,
        columnType: WeatherColumn.snow_depth_5,
        columnPeriod: PeriodColumn.annual,
      }, {
        properties: null,
      }, false,
    ], [
      {
        period: TimePeriod.Annual,
        type: WeatherType.SnowDepth5,
        columnType: WeatherColumn.snow_depth_5,
        columnPeriod: PeriodColumn.annual,
      }, undefined, false,
    ],
  ])(
    '%#) FeatureSelector.hasData(%p, %p)',
    // @ts-ignore
    (record: WeatherRecord, d?: Feature, expected: boolean) => {
      expect(FeatureSelector.hasData(record, d)).toBe(expected);
    },
  );
  it("retrieves selected data for a county", () => {
    const record = {
      period: TimePeriod.Annual,
        type: WeatherType.SnowDepth5,
      columnType: WeatherColumn.snow_depth_5,
      columnPeriod: PeriodColumn.annual,
    };
    const d = {
      properties: {
        weather: {
          annual: {
            snow_depth_5: 0.5,
          },
        },
      },
    };

    expect(FeatureSelector.getData(record, d as Feature)).toBe(0.5);
  });
});
