import React from "react";
import { TimePeriod } from "../../types/enums";
import { AppPanel } from "./panel/AppPanel";
import { AppPanelBlock } from "./panel/AppPanelBlock";
import { SET_PERIOD } from "../../types/components/App";

export interface AppPeriodMenuProps {
  period: TimePeriod | null;
}

interface PeriodBlock {
  icon: string;
  period: TimePeriod;
}

/**
 * Menu containing choices of weather time-periods
 * @param period
 * @constructor
 * @author Matt Maduzia
 */
export function AppPeriodMenu({ period }: AppPeriodMenuProps) {
  const periods: PeriodBlock[] = [
    { icon: "calendar", period: TimePeriod.Annual },
    { icon: "snowman", period: TimePeriod.Winter },
    { icon: "flower-outline", period: TimePeriod.Spring },
    { icon: "beach", period: TimePeriod.Summer },
    { icon: "leaf", period: TimePeriod.Fall },
  ];

  return ( <div className="panel--periods">
    <AppPanel title="Time" icon="clock">
      { periods.map((item: PeriodBlock) => <AppPanelBlock
        isActive={ period === item.period }
        title={ item.period }
        icon={ item.icon }
        actionType={ SET_PERIOD }
        actionPayload={ item.period }
        key={ item.period }
      />) }
    </AppPanel>
  </div> );
}
