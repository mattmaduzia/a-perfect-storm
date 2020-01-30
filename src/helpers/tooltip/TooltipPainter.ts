import * as d3 from "d3";
import { WeatherRecord } from "../../types/weather";
import { Feature } from "../../types/counties";
import { WikiImageData } from "../../types/api";
import TooltipService from "../api/TooltipService";
import dummy_thumbnail from "../../assets/dummy_thumbnail.png";
import ForecastWriter from "./ForecastWriter";

/**
 * Draws tooltips on mouse- or touch-events, as appropriate
 */
export default class TooltipPainter {
  private static tooltip: any;
  private static image: any;
  private static title: any;
  private static subtitle: any;
  private static data: any;
  private static forecast: any;
  private static transition: any;

  public static popper: any;
  public static current: string | null;

  /**
   * Inserts the fetched wikipedia thumbnail as the source of the tooltip image
   * @param data
   */
  public static showThumbnail(data: WikiImageData): void {
    d3.select("#tooltip__image")
      .attr("src", data.source)
      .style("height", data.height)
      .style("width", data.width);
  }

  /**
   * Clears the forecast displayed on the tooltip
   */
  public static clearForecast(): void {
    (
      d3 as any
    ).select("#tooltip__forecast")
      .html("");
  }

  /**
   * Hides the loading indicator on the tooltip
   */
  public static hideLoading(): void {
    (
      d3 as any
    ).select("#tooltip__loading")
      .style("display", "none");
  }

  /**
   * Shows the loading indicator on the tooltip
   */
  public static showLoading(): void {
    (
      d3 as any
    ).select("#tooltip__loading")
      .style("display", "block");
  }

  /**
   * Updates tooltip placement based on size and target location
   */
  public static async refreshLocation(): Promise<void> {
    await TooltipPainter.popper.update();
  }

  public static init() {
    this.tooltip = d3.select("#tooltip");
    this.image = d3.select("#tooltip__image");
    this.title = d3.select("#tooltip__title");
    this.subtitle = d3.select("#tooltip__subtitle");
    this.data = d3.select("#tooltip__data");
    this.forecast = d3.select("#tooltip__forecast");
    this.transition = d3.transition("tooltip-transition")
      .ease(d3.easeCubic);
  }

  public static printForecast(data: string): void {
    this.forecast.html(data);
  }

  /**
   * Draws the starting tooltip interaction, either mouseover or touchstart
   * @param d
   * @param borderColor
   * @param record
   */
  public static handleStart(d: Feature,
    borderColor: string,
    record: WeatherRecord | null,
  ) {
    if (record !== null && !!record?.type) {
      this.setSourceElement(d.properties.key);
      const service = new TooltipService(d);
      service.fetchData();
    }

    const writer = new ForecastWriter(d.properties);
    const [county, state] = writer.getSplitName();

    this.title
      .html(writer.getTitle(county));

    this.subtitle
      .text(state);

    this.data
      .html(writer.getWeather(record));

    this.tooltip
      .interrupt("tooltip-transition")
      .transition(this.transition)
      .style("opacity", 1)
      .on("start", function(this: any) {
        d3.select(this).style("z-index", 10)
      });
  }

  /**
   * Sets the tooltip's visual source point on the dom
   * @param id
   */
  private static setSourceElement(id: string | null): void {
    if (TooltipPainter.current !== id) {
      const domId = id !== null ? id : 'tooltip__base';
      this.setTooltipReference(domId);
      TooltipPainter.popper.update();
      this.setAsCurrent(id);
    }
  }

  /**
   * Sets popper object's reference point on DOM by ID
   * @param id
   */
  private static setTooltipReference(id: string): void {
    this.popper.state.elements.reference =
      document.getElementById(id);
  }

  /**
   * Sets given county as focused with respect to the tooltip
   * @param id
   */
  private static setAsCurrent(id: string | null) {
    this.current = id !== null ? id : null;
  }

  /**
   * Draws the ending tooltip interaction, either mouseout or touchend
   */
  public static handleStop(): void {
    this.tooltip
      .interrupt("tooltip-transition")
      .transition(this.transition)
      .delay(200)
      .style("opacity", 0)
      .on("end", () => {
        this.tooltip.style("z-index", 1);

        this.setSourceElement(null);

        this.revertThumbnailToBlank();
        this.forecast
          .html("");
      });
  }

  /**
   * Changes thumbnail of tooltip back to default
   */
  public static revertThumbnailToBlank(): void {
    this.image
      .attr("src", dummy_thumbnail)
      .style("height", 300)
      .style("width", 400);
  }
}
