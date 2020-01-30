import axios from "axios";
import { WikiApiData } from "../../types/api";
import EnvironmentHelper from "../testing/EnvironmentHelper";

/**
 * Retrieves thumbnail image url from Wikipedia REST API for counties
 */
export default class WikipediaApi {
  private county: string;

  public static endpoint = "https://en.wikipedia.org/api/rest_v1/page/summary/";

  constructor(county: string) {
    this.county = county;
  }

  /**
   * Gets the thumbnail data from Wikipedia (url and dimensions)
   */
  public async fetch(): Promise<WikiApiData | null> {
    try {
      const response = await axios.get(this.getApiEndpoint());
      if (response.status >= 400) {
        throw new Error(`Received status code of ${ response.status } from Wikipedia API (${ response.statusText })`);
      }
      return {
        image: response.data.thumbnail,
        coordinates: response.data.coordinates,
      };
    } catch (err) {
      EnvironmentHelper.logIfNotProd("Error fetching Wiki data", err);
      return null;
    }
  }

  /**
   * Generates the properly-formatted API endpoint
   */
  private getApiEndpoint(): string {
    const withoutSpaces = this.county.replace(/ /g, '_');
    return `${WikipediaApi.endpoint}${ withoutSpaces }`;
  }
}
