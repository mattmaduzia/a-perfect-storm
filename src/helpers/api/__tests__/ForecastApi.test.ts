import axios from "axios";
import ForecastApi from "../ForecastApi";
import EnvironmentHelper from "../../testing/EnvironmentHelper";

jest.mock("axios");

describe("ForecastApi", () => {
  const endpoint = "https://api.weather.gov/";
  const fakeCoordinates = {
    lat: 35,
    lon: -89,
  };
  it("requests the correct station page for a county", async (done: any) => {
    (
      axios.get as any
    )
      .mockResolvedValueOnce({
        data: {
          properties: { forecastGridData: "url", },
        },
        status: 200,
      });
    (
      axios.get as any
    )
      .mockResolvedValueOnce({
        data: {
          properties: true,
        },
        status: 200,
      });

    const api = new ForecastApi(fakeCoordinates);
    const result = await api.fetch();

    expect(axios.get).toBeCalledWith(`${ endpoint }points/35,-89`);
    expect(axios.get).toBeCalledWith("url");
    expect(result).toBe(true);

    done();
  });
  describe("Failure", () => {
    const mockLogIfNotProd = jest.fn();
    EnvironmentHelper.logIfNotProd = mockLogIfNotProd;
    it("fails gracefully by returning null on non-200 status code on second" +
      " step", async (done: any) => {
      (
        axios.get as any
      )
        .mockResolvedValueOnce({
          data: {
            properties: { forecastGridData: "url", },
          },
          status: 200,
        });
      (
        axios.get as any
      )
        .mockResolvedValueOnce({
          data: {
            properties: true,
          },
          status: 400,
        });

      const api = new ForecastApi(fakeCoordinates);
      const result = await api.fetch();

      expect(axios.get).toBeCalledWith(`${ endpoint }points/35,-89`);
      expect(axios.get).toBeCalledWith("url");
      expect(result).toBe(null);
      expect(mockLogIfNotProd).toBeCalled();

      done();
    });
    it("fails gracefully by returning null on non-200 status code on first" +
      " step", async (done: any) => {
      (
        axios.get as any
      )
        .mockResolvedValueOnce({
          data: {
            properties: { forecastGridData: "url", },
          },
          status: 400,
        });

      const api = new ForecastApi(fakeCoordinates);
      const result = await api.fetch();

      expect(axios.get).toBeCalledWith(`${ endpoint }points/35,-89`);
      expect(result).toBe(null);
      expect(mockLogIfNotProd).toBeCalled();

      done();
    });
  });
});
