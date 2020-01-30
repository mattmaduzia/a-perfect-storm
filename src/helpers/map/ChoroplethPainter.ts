import * as d3 from "d3";
import { WeatherColumn, PeriodColumn } from "../../types/enums";
import TooltipPainter from "../tooltip/TooltipPainter";
import { Feature } from "../../types/counties";
import { WeatherRecord } from "../../types/weather";
import FeatureSelector from "./FeatureSelector";

/**
 * Encapsulates the drawing of the map to the dom using provided data and D3
 */
export default class ChoroplethPainter {
  private readonly counties!: Feature[];
  private readonly states: any;
  private readonly path: any;
  private readonly transition: any;
  private readonly events: any;
  private readonly tooltip: TooltipPainter;
  private record: WeatherRecord | null = null;
  public static grey: string = '#dedede';

  public constructor(counties: Feature[], states: any) {
    this.path = d3.geoPath();
    this.counties = counties;
    this.states = states;
    this.transition = this.makeTransition("choropleth-transition");
    this.events = this.getEventsByDevice();
    this.tooltip = new TooltipPainter();
  }

  /**
   * Whether a weather-type and -period are selected
   */
  private get hasSelection(): boolean {
    return this.record !== null;
  }

  /**
   * Sets a weather-type and -period
   * @param record
   */
  public setRecord(record: WeatherRecord): void {
    this.record = record;
  }

  /**
   * Weather-type, in column-format
   */
  private get type(): WeatherColumn | null {
    return this.record !== null ? this.record.columnType : null;
  }

  /**
   * Time-period, in column-format
   */
  private get period(): PeriodColumn | null {
    return this.record !== null ? this.record.columnPeriod : null;
  }

  /**
   * Whether a county has data for the current weather-type and -period
   * @param d
   */
  private hasData(d: Feature): boolean {
    return FeatureSelector.hasData(this.record, d);
  }

  /**
   * Retrieves a county's value for the current weather-type and -period
   * @param d
   */
  private getData(d: Feature): number {
    return FeatureSelector.getData(this.record!, d);
  }

  /**
   * Creates a color-scaling function from the current weather-type and
   * -period's data
   */
  private makeColorFunc() {
    if (!!this.type && !!this.period) {
      const colorFunc = d3.scaleSqrt()
        .interpolate(() => d3.interpolateYlGnBu)
        .domain([
          0, d3.max(this.counties,
            (d: Feature) => this.hasData(d) ? this.getData(d) : null,
          )!,
        ]);
      return (value: number | null) => value !== null
        ? colorFunc(value)
        : ChoroplethPainter.grey;
    }
    return () => 'skyblue';
  }

  /**
   * Draws an SVG choropleth of the United States using the data provided
   */
  public paint(): void {
    const svg = d3.select("#map");
    const paths = svg.selectAll("path");
    const that = this;

    const appended = paths
      /** Adds county path- and weather-data to the DOM */
      .data(this.counties, this.mapKeys as any)
      .enter()
      .append("path");

    /** Sets up events that don't change with type/period update */
    appended.on(this.events.end, function (this: any) {
      d3.select(this).attr("stroke", null).lower();
      TooltipPainter.handleStop();
    });
    if (!this.isSmallDevice) {
      appended.on("mousemove", function (this: any, e: Feature) {
        if (that.hasData(e)) {
          TooltipPainter.refreshLocation();
        }
      });
    }

    /** Sets the options for the counties' first paint */
    appended.attr("id", (d: Feature) => d.properties.key)
      .call(this.paintEnter, this);

    /** adds listener for weather type/period update */
    svg.call(this.addUpdateListener, this);

    this.drawStates(svg);
  }

  /**
   * The key function for the data
   * @param d
   */
  private mapKeys(d: Feature) {
    return !!d?.properties ? d.properties.key : null;
  }

  /**
   * Listens for an update, triggering data and color changes
   * @param selection
   * @param that
   */
  private addUpdateListener(selection: any, that: this) {
    return selection.on("update-weather", function (this: any) {
      const { record } = d3.event.detail;
      const svg = d3.select(this);
      if (!!record?.type && !!record?.period) {
        that.setRecord(record);
        svg.call(that.handleUpdateWeather, that);
      }
    } as any);
  }

  /**
   * (Re-)executes the enter animation
   * @param selection
   * @param that
   */
  private paintEnter(selection: any, that: this): void {
  selection
    .attr("fill", "white")
    .attr("d", that.path)
    .transition(that.transition)
    .attr("fill", "skyblue");
  }

  /**
   * Draws the paths of the states onto the map
   * @param svg
   */
  private drawStates(svg: any) {
    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("d", this.path(this.states))
      .classed("state", true);
  }

  /**
   * Creates a transition
   */
  private makeTransition(name: string, duration: number = 500) {
    return d3.transition(name)
      .duration(duration)
      .ease(d3.easeCubic);
  }

  /**
   * Whether the current device or viewport is relatively small
   */
  private get isSmallDevice(): boolean {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  /**
   * Determines if mouse or touch events are necessary based on device size
   */
  private get mouseOrTouch(): "mouse"|"touch" {
    return this.isSmallDevice ? "touch" : "mouse";
  }

  /**
   * Uses simple media queries to choose between touch and mouse events
   */
  private getEventsByDevice() {
    return this.isSmallDevice ? {
      start: "touchstart", end: "touchend",
    } : {
      start: "mouseover", end: "mouseout",
    };
  }

  /**
   * Listener that updates the map when the weather-type or -period changes
   * @param selection
   * @param that
   */
  private handleUpdateWeather(selection: any, that: this) {
    const { start } = that.events;
    const color = that.makeColorFunc();

    selection
      .selectAll("path")
      .on(start, function (this: any, e: any) {
        if (that.isValid(e)) {
          that.handleInteractionStart(this, e, color);
        }
      })
      .call(that.updateColor, that, color);
  }

  /**
   * Whether there is a selected type/period and a county's data is valid
   * @param e
   */
  private isValid(e: any) {
    return this.hasSelection && this.hasData(e);
  }

  /**
   * Handles the touchstart/mouseover of a single county, initiating stroke
   * increase and tooltip painting
   * @param selectionThis
   * @param e
   * @param color
   */
  private handleInteractionStart(selectionThis: any, e: any, color: any) {
    const innerThis = d3.select(selectionThis);
    innerThis.attr("stroke", "#000").raise();
    TooltipPainter.handleStart(e, color(this.getData(e)), this.record);
  }

  /**
   * Transitions the color of each county according to its data with respect
   * to the rest of the counties
   * @param selection
   * @param that
   * @param color
   */
  private updateColor(
    selection: any,
    that: this,
    color: Function,
  ) {
    return selection
      .interrupt("choropleth-transition")
      .transition(that.transition)
      .delay((d: Feature) => !!d?.properties?.tip
        ? d.properties.tip! * 2.5
        : null)
      .attr("fill",
        (d: Feature) => that.hasData(d)
          ? color(that.getData(d))
          : ChoroplethPainter.grey,
      );
  }
}
