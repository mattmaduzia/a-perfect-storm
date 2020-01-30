import ApiCache from "../ApiCache";

describe("ApiCache", () => {
  let key: number, data: any;
  beforeEach(() => {
    key = 1;
    data = {
      lastUpdated: Date.now(),
      wiki: {
        coordinates: {
          lat: 0,
          lon: 0,
        },
        image: {
          source: "url",
          width: 300,
          height: 300,
        },
      },
      forecast: {
        heatIndex: {
          sourceUnit: "F",
          uom: "none",
        },
        maxTemperature: {
          sourceUnit: "F",
          uom: "none",
          values: [],
        },
        minTemperature: {
          sourceUnit: "F",
          uom: "none",
          values: [
            {
              validTime: "",
              value: 1,
            },
          ],
        }, /* Intentionally missing
         probabilityOfPrecipitation: {
         sourceUnit: "F",
         uom: "none",
         values: [],
         },*/
        skyCover: {
          sourceUnit: "F",
          uom: "none",
          values: [
            {
              validTime: "",
              value: 1,
            },
          ],
        },
        snowfallAmount: {
          sourceUnit: "F",
          uom: "none",
          values: [
            {
              validTime: "",
              value: 1,
            },
          ],
        },
        snowLevel: {
          sourceUnit: "F",
          uom: "none",
          values: [
            {
              validTime: "",
              value: 1,
            },
          ],
        },
        temperature: {
          sourceUnit: "F",
          uom: "none",
          values: [
            {
              validTime: "",
              value: 1,
            },
          ],
        },
        windChill: {
          sourceUnit: "F",
          uom: "none",
          values: [
            {
              validTime: "",
              value: 1,
            },
          ],
        },
        windSpeed: {
          sourceUnit: "F",
          uom: "none",
          values: [
            {
              validTime: "",
              value: 1,
            },
          ],
        },
      },
    };
    ApiCache.init();
  });
  describe("has", () => {
    it("returns false on keys that don't exist in the private static cache", () => {
      expect(ApiCache.has(1)).toBe(false);
    });
    it("returns true on keys that do exist in the private static cache", () => {
      ApiCache.set(key, data);
      expect(ApiCache.has(key)).toBe(true);
    });
  });
  describe("get", () => {
    it("retrieves an item by key from the private static cache", () => {
      ApiCache.set(key, data);
      expect(ApiCache.get(key)).toEqual(data);
    });
    it("returns undefined if key is not found", () => {
      expect(ApiCache.get(1)).toBeUndefined();
    });
  });
  describe("setUpdated", () => {
    it("sets the 'lastUpdated' property to the current Unix timestamp", () => {
      data.lastUpdated = 0;
      ApiCache.set(key, data);
      ApiCache.setUpdated(key);
      expect(ApiCache.get(key)?.lastUpdated).toBeGreaterThan(0);
    });
    it("throws error on invalid cache key access", () => {
      expect(() => {
        ApiCache.setUpdated(1);
      }).toThrow();
    });
  });
  describe("hasWiki", () => {
    it("returns false if key is not found", () => {
      expect(ApiCache.hasWiki(1)).toBe(false);
    });
    it("returns false if entry is stale", () => {
      data.lastUpdated = Date.now() - ApiCache.timeToLive;
      ApiCache.set(key, data);
      expect(ApiCache.hasWiki(key)).toBe(false);
    });
    it("returns false if wiki entry is missing a property", () => {
      data.wiki.image = null;
      ApiCache.set(key, data);
      expect(ApiCache.hasWiki(key)).toBe(false);
    });
    it("returns true if not stale and not missing properties", () => {
      ApiCache.set(key, data);
      expect(ApiCache.hasWiki(key)).toBe(true);
    });
  });
  describe("hasForecast", () => {
    it("returns false if key is not found", () => {
      expect(ApiCache.hasForecast(1)).toBe(false);
    });
    it("returns false if entry is stale", () => {
      data.lastUpdated = Date.now() - ApiCache.timeToLive;
      ApiCache.set(key, data);
      expect(ApiCache.hasForecast(key)).toBe(false);
    });
    it("returns false if Forecast entry is missing the ubiquitous" +
      " 'temperature' property", () => {
      data.forecast.temperature = null;
      ApiCache.set(key, data);
      expect(ApiCache.hasForecast(key)).toBe(false);
    });
    it("returns true if not stale and not missing 'temperature'", () => {
      ApiCache.set(key, data);
      expect(ApiCache.hasForecast(key)).toBe(true);
    });
  });
  describe("setWiki", () => {
    it("sets the 'wiki' property of an existing cache node", () => {
      const wikiData = data.wiki;
      data.wiki = null;
      ApiCache.set(key, data);
      expect(ApiCache.get(key)!.wiki).toBeNull();
      ApiCache.setWiki(key, wikiData);
      data.wiki = wikiData;
      expect(ApiCache.get(key)).toEqual(data);
    });
    it("creates a nonexistent cache node and sets its wiki data and defaults",
      () => {
        expect(ApiCache.has(key)).toBe(false);
        ApiCache.setWiki(key, data.wiki);
        expect(ApiCache.get(key)).toEqual({
          wiki: data.wiki,
          forecast: null,
          lastUpdated: expect.any(Number),
        });
      },
    );
  });
  describe("setForecast", () => {
    it("sets the 'forecast' property of an existing cache node", () => {
      const forecastData = data.forecast;
      data.forecast = null;
      ApiCache.set(key, data);
      expect(ApiCache.get(key)!.forecast).toBeNull();
      ApiCache.setForecast(key, forecastData);
      data.forecast = forecastData;
      expect(ApiCache.get(key)).toEqual(data);
    });
    it("creates a nonexistent cache node and sets its forecast data and defaults",
      () => {
        expect(ApiCache.has(key)).toBe(false);
        ApiCache.setForecast(key, data.forecast);
        expect(ApiCache.get(key)).toEqual({
          forecast: data.forecast,
          wiki: null,
          lastUpdated: expect.any(Number),
        });
      },
    );
  });
  describe("clear", () => {
    it("deletes all current cache entries", () => {
      ApiCache.set(key, data);
      expect(ApiCache.has(key)).toBe(true);
      ApiCache.clear();
      expect(ApiCache.has(key)).toBe(false);
    });
  });
});
