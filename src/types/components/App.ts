import { TimePeriod, WeatherType } from "../enums";

export const SET_PERIOD = "SET_PERIOD";
export const SET_TYPE = "SET_TYPE";

export interface AppState {
  period: TimePeriod | null;
  type: WeatherType | null;
}

export interface SetPeriodAction {
  type: typeof SET_PERIOD;
  payload: TimePeriod | null;
}

export interface SetTypeAction {
  type: typeof SET_TYPE;
  payload: WeatherType | null;
}

export type AppActionTypes =  SetPeriodAction | SetTypeAction;
