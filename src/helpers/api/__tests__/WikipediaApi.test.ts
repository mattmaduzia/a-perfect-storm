import axios from "axios";
import WikipediaApi from "../WikipediaApi";
import EnvironmentHelper from "../../testing/EnvironmentHelper";

jest.mock("axios");

describe("WikipediaApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const endpoint = "https://en.wikipedia.org/api/rest_v1/page/summary/";
  it(
    "requests the correct wikipedia summary page for a county",
    async (done: any) => {
      const fakeCounty = "fake county";
      const fakeCountyUnderscored = "fake_county";
      (
        axios.get as any
      )
        .mockResolvedValue({
          data: {
            thumbnail: null,
            coordinates: null,
          },
          status: 200,
        });

      const api = new WikipediaApi(fakeCounty);
      const result = await api.fetch();

      expect(axios.get)
        .toBeCalledWith(`${ endpoint }${ fakeCountyUnderscored }`);
      expect(result).toEqual({
        image: null,
        coordinates: null,
      });

      done();
    },
  );
  describe("Failure", () => {

    const mockLogIfNotProd = jest.fn();
    EnvironmentHelper.logIfNotProd = mockLogIfNotProd;

    it(
      "fails gracefully by returning null on non-200 status code",
      async (done: any) => {
        const fakeCounty = "fake county";
        (
          axios.get as any
        )
          .mockResolvedValue({
            data: {
              thumbnail: null,
              coordinates: null,
            },
            status: 400,
          });

        const api = new WikipediaApi(fakeCounty);
        const result = await api.fetch();

        expect(result).toBeNull();
        expect(mockLogIfNotProd).toBeCalled();

        done();
      },
    );
    it("fails gracefully by returning null on error", async (done: any) => {
      const fakeCounty = "fake county";
      (
        axios.get as any
      )
        .mockResolvedValue({
          data: {},
          status: 400,
        });

      const api = new WikipediaApi(fakeCounty);
      const result = await api.fetch();

      expect(mockLogIfNotProd).toBeCalled();
      expect(result).toBeNull();

      done();
    });
  });
});
