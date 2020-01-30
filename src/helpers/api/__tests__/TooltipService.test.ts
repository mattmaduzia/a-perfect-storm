import ApiCache from "../ApiCache";
import { Feature } from "../../../types/counties";
import TooltipService from "../TooltipService";
import WikipediaApi from "../WikipediaApi";
import ForecastApi from "../ForecastApi";
import TooltipPainter from "../../tooltip/TooltipPainter";
import debounce from "lodash/debounce";
import ForecastWriter from "../../tooltip/ForecastWriter";

jest.mock("lodash/debounce");

( debounce as any ).mockImplementation((fn: any) => fn);

const mockWriteForecast = jest.fn().mockImplementation(() => "test");
ForecastWriter.writeForecast = mockWriteForecast;

const mockClearForecast = jest.fn();
const mockShowThumbnail = jest.fn();
const mockShowLoading = jest.fn();
const mockHideLoading = jest.spyOn(TooltipPainter, "hideLoading")
  .mockImplementation(() => ( {} ));
const mockRevertThumbnail = jest.fn();
const mockPrintForecast = jest.fn();
const mockRefreshLocation = jest.fn();
TooltipPainter.clearForecast = mockClearForecast;
TooltipPainter.showThumbnail = mockShowThumbnail;
TooltipPainter.showLoading = mockShowLoading;
TooltipPainter.revertThumbnailToBlank = mockRevertThumbnail;
TooltipPainter.printForecast = mockPrintForecast;
TooltipPainter.refreshLocation = mockRefreshLocation;

const mockFetchWiki = jest.fn();
jest.mock("../WikipediaApi", () => {
  return jest.fn().mockImplementation(() => {
    return { fetch: mockFetchWiki };
  });
});
const mockFetchForecast = jest.fn();
jest.mock("../ForecastApi", () => {
  return jest.fn().mockImplementation(() => {
    return { fetch: mockFetchForecast };
  });
});

const mockHas = jest.fn().mockImplementation(() => false);
const mockHasForecast = jest.fn();
const mockHasWiki = jest.fn();
const mockGet = jest.fn().mockImplementation(() => true);
const mockSetWiki = jest.fn();
const mockSetForecast = jest.fn();

ApiCache.has = mockHas;
ApiCache.hasForecast = mockHasForecast;
ApiCache.hasWiki = mockHasWiki;
ApiCache.setForecast = mockSetForecast;
ApiCache.setWiki = mockSetWiki;
ApiCache.get = mockGet;

const spyFetchWikiData = jest.spyOn(TooltipService, "fetchWikiData" as never);
const spyFetchForecastData = jest.spyOn(TooltipService, "fetchForecastData" as never);
const spyInsertForecast = jest.spyOn(TooltipService, "insertForecast" as never);

TooltipPainter.current = "test";

const mockRetBool = (mock: any,
  bool: boolean,
) => mock.mockImplementationOnce(() => bool);

describe("TooltipService", () => {
  let feature: Feature, id: string;
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchWiki.mockImplementation(() => ( {
      coordinates: "coordinates test",
      image: "image test",
    } ));
    mockFetchForecast.mockImplementation(() => ( {
      nonnull: true,
    } ));
    mockRetBool(mockHas, false);
    feature = {
      properties: {
        name: "Test County",
        key: "test",
      },
    } as Feature;
    id = feature.properties.key;
  });
  it("queries cache for item before hitting API endpoint",
    async (done: any) => {
      mockHas.mockReset();
      mockRetBool(mockHas, true);
      mockRetBool(mockHasForecast, true);
      mockRetBool(mockHasWiki, true);

      const service = new TooltipService(feature);
      await service.fetchData();

      expect(mockClearForecast).toBeCalledTimes(1);
      expect(mockRevertThumbnail).toBeCalledTimes(1);
      expect(ApiCache.has).toBeCalledWith(id);

      expect(mockShowLoading).toBeCalledTimes(1);
      expect(ApiCache.hasForecast).toBeCalledWith(id);
      expect(ApiCache.hasWiki).toBeCalledWith(id);
      expect(ApiCache.get).toBeCalledWith(id);

      expect(mockWriteForecast).toBeCalled();
      expect(mockShowThumbnail).toBeCalled();
      expect(mockPrintForecast).toBeCalled();
      expect(mockRefreshLocation).toBeCalled();
      expect(mockHideLoading).toBeCalled();

      expect(WikipediaApi).not.toBeCalled();
      expect(spyFetchWikiData).not.toBeCalled();
      expect(spyFetchForecastData).not.toBeCalled();
      expect(spyInsertForecast).toBeCalled();

      done();
    },
  );
  it("if not found in cache, goes on to call the wiki API directly",
    async (done: any) => {
      const service = new TooltipService(feature);

      await service.fetchData();

      expect(mockShowLoading).toBeCalled();
      expect(WikipediaApi).toBeCalledWith(feature.properties.name);
      expect(mockFetchWiki).toBeCalledTimes(1);
      expect(mockSetWiki).toBeCalledWith(id, {
        coordinates: "coordinates" + " test",
        image: "image test",
      });
      expect(mockShowThumbnail).toBeCalledWith("image test");
      expect(spyFetchWikiData).toBeCalled();

      done();
    },
  );
  it("if wiki fetch fails, returns null", async (done: any) => {
    mockFetchWiki.mockReset();
    mockFetchWiki.mockImplementationOnce(() => null);

    const service = new TooltipService(feature);

    await service.fetchData();

    expect(WikipediaApi).toBeCalledWith(feature.properties.name);
    expect(spyFetchWikiData).toBeCalled();
    expect(spyFetchForecastData).not.toBeCalled();
    expect(mockFetchWiki).toBeCalled();
    expect(mockSetWiki).not.toBeCalled();
    expect(mockHideLoading).toBeCalled();

    done();
  });
  it("if wiki data is not null, goes on to call the forecast API",
    async (done: any) => {
      const service = new TooltipService(feature);

      await service.fetchData();

      expect(mockShowLoading).toBeCalled();
      expect(WikipediaApi).toBeCalledWith(feature.properties.name);
      expect(mockFetchWiki).toBeCalledTimes(1);
      expect(mockSetWiki).toBeCalledWith(id, {
        coordinates: "coordinates test",
        image: "image test",
      });
      expect(mockShowThumbnail).toBeCalledWith("image test");
      expect(ForecastApi).toBeCalledWith("coordinates test");

      expect(spyFetchWikiData).toBeCalledWith("test", "Test County");
      expect(spyFetchForecastData).toBeCalledWith("test",  {
        coordinates: "coordinates test",
        image: "image test",
      });
      expect(mockFetchForecast).toBeCalled();
      expect(mockFetchForecast).toReturnWith({ nonnull: true });

      done();
    },
  );
  it("if forecast fetch fails, returns null", async (done: any) => {
    mockFetchForecast.mockImplementationOnce(() => null);

    const service = new TooltipService(feature);

    await service.fetchData();

    expect(mockClearForecast).toBeCalled();
    expect(mockShowLoading).toBeCalled();
    expect(mockShowThumbnail).toBeCalled();

    expect(ForecastApi).toBeCalled();
    expect(mockFetchForecast).toBeCalled();
    expect(mockSetForecast).toBeCalledTimes(0);

    done();
  });
});
