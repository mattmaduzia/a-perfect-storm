// @ts-ignore
import { feature, mesh } from "topojson-client";
import { Feature, Topology, TopologyWrapped } from "../../types/counties";

/**
 * Initiates and contains the map's data- and drawing-dependencies
 */
export default class MapDeps {
  public counties!: Feature[];
  public states!: Feature[];

  private constructor() {}

  /**
   * Static constructor that asynchronously imports the map's dependencies,
   * then returns a MapDeps DTO containing the result
   */
  public static async init(): Promise<MapDeps> {
    const self = new MapDeps();
    const topology: Topology = ( ( await import('../../assets/topojson.json') ) as unknown as TopologyWrapped ).topology;
    self.states = mesh(topology,
      topology.objects.states,
      (a: any, b: any) => a !== b,
    );
    const counties = feature(topology, topology.objects.counties).features;
    self.counties = counties.map((county: Feature) => {
      return {
        ...county, properties: {
          ...county.properties, tip: MapDeps.getTip(county),
        },
      };
    });

    return self;
  }

  /**
   * Gets the southernmost coordinate of a county
   * @param county
   */
  private static getTip(county: Feature): number | undefined {
    if (county?.geometry?.type === "Polygon") {
      return county.geometry.coordinates?.[0]?.[0]?.[1];
    } else if (county?.geometry.type === "MultiPolygon") {
      return county.geometry.coordinates?.[0]?.[0]?.[0]?.[1];
    }
  };
}
