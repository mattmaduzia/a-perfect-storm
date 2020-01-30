import React, { useState } from "react";
import { useMap } from "../../hooks/useMap";
import { AppTopList } from "./toplist/AppTopList";
import { WeatherType, TimePeriod } from "../../types/enums";
import MapDeps from "../../helpers/map/MapDeps";

interface AppChoroplethProps {
  type: WeatherType | null;
  period: TimePeriod | null;
}

/**
 * The map component
 * @param type
 * @param period
 * @constructor
 */
export function AppChoropleth({ type, period }: AppChoroplethProps) {
  const [deps, setDeps] = useState(( () => MapDeps.init() ) as unknown as MapDeps);

  if (typeof ( deps as any ).then === "function") {
    ( deps as any ).then((mapDeps: MapDeps) => setDeps(mapDeps));
  }

  useMap(deps, type, period);

  return ( <div className="flex flex-column justify-space-around">
    <svg
      className="flex"
      width={ 780 }
      height={ 500 }
      viewBox="90 6 780 500"
      id="map"
    />

    { ( !!deps && !!deps?.counties ) && <AppTopList
      deps={ deps }
      type={ type }
      period={ period }
    /> }

  </div> );
}
