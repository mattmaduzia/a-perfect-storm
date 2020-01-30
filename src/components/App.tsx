import React, { useReducer, Dispatch, useEffect } from 'react';
import '../App.css';
import { AppChoropleth } from "./map/AppChoropleth";
import { AppAxes } from "./layout/AppAxes";
import { AppPeriodMenu } from "./layout/AppPeriodMenu";
import {
  AppState, AppActionTypes, SET_PERIOD, SET_TYPE,
} from "../types/components/App";
import { AppTooltip } from "./layout/tooltip/AppTooltip";
import { AppMessage } from "./layout/message/AppMessage";
import { AppFooter } from "./layout/footer/AppFooter";
import { AppHeader } from "./layout/header/AppHeader";
import ApiCache from "../helpers/api/ApiCache";

const reducer = (state: AppState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case SET_PERIOD:
      return {
        ...state,
        period: action.payload,
      };
    case SET_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    default: throw new Error();
  }
};

export const DispatchContext = React.createContext(null as unknown as Dispatch<any>);

/**
 * Main app component
 * @constructor
 */
const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { type: null, period: null });

  useEffect(() => {
    ApiCache.hydrate();
    window.addEventListener("beforeunload", () => {
      ApiCache.store();
    });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <AppHeader />
      <div className="slide-up columns is-desktop has-padding-20-desktop is-bottom-marginless">
        <div className="flex flex-column column is-one-quarter-desktop">
          <AppAxes type={state.type} />
          <AppPeriodMenu period={state.period}/>
        </div>
        <div className="column is-three-quarters-desktop">
          <AppTooltip />
          <AppMessage body="Select a weather-type and time-period to get started." title="Hello!" />
          <AppChoropleth type={state.type} period={state.period} />
        </div>
      </div>
      <div id="tooltip__base" />
      <AppFooter />
    </DispatchContext.Provider>
  );
};

export default App;
