import React, { useState } from "react";
import { WeatherType, WeatherTitle } from "../../types/enums";
import { AppPanelBlock } from "./panel/AppPanelBlock";
import { SET_TYPE } from "../../types/components/App";
import { AppPanel } from "./panel/AppPanel";
import { AppPanelTabs } from "./panel/AppPanelTabs";

interface AppAxesProps {
  type: WeatherType | null;
}

export const AppAxesTabNames = [
  'Clouds/Sun', 'Rain/Snow', 'Temp/Wind',
];

/**
 * Displays the axes upon which the weather can be filtered
 * @param props
 * @constructor
 */
export function AppAxes(props: AppAxesProps) {

  const blocks = [
    [
      { icon: 'weather-fog', type: WeatherType.CloudsBroken },
      { icon: 'weather-sunny', type: WeatherType.CloudsClear },
      { icon: 'weather-partly-cloudy', type: WeatherType.CloudsFew },
      { icon: 'weather-cloudy', type: WeatherType.CloudsOvercast },
      { icon: 'weather-windy-variant', type: WeatherType.CloudsScattered },
    ], [
      { icon: 'weather-snowy-rainy', type: WeatherType.Precipitation },
      { icon: 'weather-partly-snowy', type: WeatherType.SnowAverage },
      { icon: 'weather-snowy', type: WeatherType.SnowDepth1 },
      { icon: 'weather-snowy-heavy', type: WeatherType.SnowDepth5 },
    ], [
      { icon: 'home-thermometer', type: WeatherType.TempAverage },
      { icon: 'thermometer-chevron-up', type: WeatherType.TempMax },
      { icon: 'thermometer-chevron-down', type: WeatherType.TempMin },
      { icon: 'weather-night-partly-cloudy', type: WeatherType.TempDiurnal },
      { icon: 'water-pump', type: WeatherType.HeatIndex },
      { icon: 'snowflake', type: WeatherType.WindChill },
      { icon: 'weather-windy', type: WeatherType.WindSpeed },
    ],
  ];

  const [activeTab, setActiveTab] = useState(1);

  const currentTab = blocks[activeTab];

  return ( <div className="flex panel--types has-margin-bottom-20">
      <AppPanel icon="keyboard" title="Type">
        <AppPanelTabs
          tabNames={ AppAxesTabNames }
          activeTab={ activeTab }
          setActiveTab={ setActiveTab }
        />
        { currentTab.map((block: any, i: number) => <AppPanelBlock
          key={ `${ block.title }${ i }` }
          isActive={ props.type === block.type }
          icon={ block.icon }
          actionType={ SET_TYPE }
          actionPayload={ block.type }
          title={ ( WeatherTitle as any )[block.type] }
        />) }
      </AppPanel>
    </div> );
}
