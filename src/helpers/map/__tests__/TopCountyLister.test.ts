import {
  WeatherType,
  TimePeriod,
  WeatherTitle, WeatherUnits,
} from "../../../types/enums";
import TopCountyLister from "../TopCountyLister";
import {
  WeatherTyped,
  WeatherRecord, TopCountySummary,
} from "../../../types/weather";
import { RefObject } from "react";
import FeatureSelector from "../FeatureSelector";
import { Feature } from "../../../types/counties";

const mockHasData = jest.fn().mockImplementation(() => true);
const mockGetData = jest.fn().mockImplementation((
  record: WeatherRecord,
  d: Feature,
) => d.properties.weather);

FeatureSelector.getData = mockGetData;
FeatureSelector.hasData = mockHasData;

describe("Facilitates the listing of top-n counties by weather statistic",
  () => {
    //<editor-fold desc="hasNewTypeAndPeriod">
    test.each([
      // just type supplied
      [
        WeatherType.SnowDepth5,
        null,
        { type: null, period: null, lister: null, sortAsc: false },
        false,
      ], // just period supplied
      [
        null,
        TimePeriod.Annual,
        { type: null, period: null, lister: null, sortAsc: false },
        false,
      ], // period and type set but both equal new
      [
        WeatherType.SnowDepth5, TimePeriod.Annual, {
        type: WeatherType.SnowDepth5,
        period: TimePeriod.Annual,
        lister: null,
        sortAsc: false,
      }, false,
      ], // period and type set and type does not equal new
      [
        WeatherType.SnowDepth5,
        TimePeriod.Annual,
        { type: null, period: TimePeriod.Annual, lister: null, sortAsc: false },
        true,
      ], // period and type set and period does not equal new
      [
        WeatherType.SnowDepth5, TimePeriod.Annual, {
        type: WeatherType.SnowDepth5,
        period: null,
        lister: null,
        sortAsc: false,
      }, true,
      ], // period and type set and both do not equal new
      [
        WeatherType.SnowDepth5,
        TimePeriod.Annual,
        { type: null, period: null, lister: null, sortAsc: false },
        true,
      ],
    ])(
      '%#) TopCountyLister.hasNewTypeAndPeriod(%p, %p, %p)', // @ts-ignore
      // @ts-ignore
      (type: WeatherType | null,
        period: TimePeriod | null,
        typed: WeatherTyped,
        expected: boolean,
      ) => {
        expect(TopCountyLister.hasNewTypeAndPeriod(typed, type, period)).toBe(
          expected);
      },
    );
    //</editor-fold>
    it("determines if the current sort differs from the cache", () => {
      let cache = {
        type: null, period: null, lister: null, sortAsc: true,
      };

      expect(TopCountyLister.hasNewSort(cache, true)).toBe(false);
      expect(TopCountyLister.hasNewSort(cache, false)).toBe(true);
    });
    it("sets the cache to most up-to-date values", () => {
      const ref = {
        current: {
          type: null,
          period: null,
          lister: null,
          sortAsc: false,
        },
      } as RefObject<WeatherTyped>;

      const updated = {
        type: WeatherType.SnowDepth5,
        period: TimePeriod.Annual,
        lister: true,
        sortAsc: true,
      };

      TopCountyLister.updateCache(ref, updated as unknown as WeatherTyped);

      expect(ref.current).toEqual(updated);
    });
    it("generates a sorted top list", () => {
      const data = [
        {
          properties: { name: "Test 5", weather: 5 },
        }, {
          properties: { name: "Test 4", weather: 4 },
        }, {
          properties: { name: "Test 2", weather: 2 },
        }, {
          properties: { name: "Test 3", weather: 3 },
        }, {
          properties: { name: "Test 1", weather: 1 },
        }, {
          properties: { name: "Test 6", weather: 6 },
        },
        null,
      ] as unknown as Feature[];
      // sortAsc is true
      const lister = new TopCountyLister(data, WeatherType.SnowDepth5, TimePeriod.Annual, true, 5);

      const toplist1 = lister.generateTopCounties();

      expect(toplist1.title).toBe(`${ WeatherTitle[WeatherType.SnowDepth5] } (${TimePeriod.Annual})`);
      expect(toplist1.units).toBe(WeatherUnits.SnowDepth5);
      expect(toplist1.summary.map((summary: TopCountySummary) => summary.value))
        .toEqual([1, 2, 3, 4, 5]);

      // sortAsc is False
      lister.setSortAsc(false);
      const toplist2 = lister.generateTopCounties();
      expect(toplist2.summary.map((summary: TopCountySummary) => summary.value))
        .toEqual([6, 5, 4, 3, 2]);

    });
  },
);
