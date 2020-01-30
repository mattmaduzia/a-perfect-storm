import React from "react";
import { render } from "@testing-library/react";
import {
  AppPanelBlockProps, AppPanelBlock,
} from "../AppPanelBlock";
import { DispatchContext } from "../../../App";
import { WeatherType, WeatherTitle, TimePeriod } from "../../../../types/enums";
import userEvent from "@testing-library/user-event";
import { SET_TYPE } from "../../../../types/components/App";

const mockDispatch = jest.fn();
const renderPanelBlock = (props: AppPanelBlockProps) => {
  return (
    <DispatchContext.Provider value={mockDispatch}>
      <AppPanelBlock {...props} />
    </DispatchContext.Provider>
  );
};

describe("a single entry in a sidebar panel", () => {
  let props: AppPanelBlockProps;
  beforeEach(() => {
    props = {
      isActive: false,
      actionType: SET_TYPE,
      actionPayload: WeatherType.SnowDepth5,
      icon: "book",
      title: WeatherTitle[WeatherType.SnowDepth5],
    };

    jest.resetAllMocks();
  });

  it("type is displayed as title", () => {
    const { queryByText } = render(renderPanelBlock(props));
    const title = queryByText(WeatherTitle[WeatherType.SnowDepth5]);
    expect(title).not.toBeNull();
  });
  it("displays its icon prop", () => {
    const { queryByTestId } = render(renderPanelBlock(props));
    const icon = queryByTestId('apb--icon')!;
    expect(icon.classList).toContain('mdi-book');
  });
  it("changes icon to white when active", () => {
    const { rerender, queryByTestId } = render(renderPanelBlock(props));
    const icon = queryByTestId('apb--icon')!;
    expect(icon.classList).not.toContain('has-text-white');

    props.isActive = true;

    rerender(renderPanelBlock(props));

    expect(icon.classList).toContain('has-text-white');
  });
  it("has blue background and white text when active", () => {
    const { rerender, queryByTestId } = render(renderPanelBlock(props));
    const wrapper = queryByTestId('apb--wrapper')!;
    expect(Object.values(wrapper.classList)).toEqual(expect.not.arrayContaining([
      'has-background-accent',
      'has-text-white',
    ]));
    expect(Object.values(wrapper.classList)).toEqual(expect.arrayContaining([
      'has-cursor-pointer',
      'has-background-transparent',
    ]));

    props.isActive = true;

    rerender(renderPanelBlock(props));

    expect(Object.values(wrapper.classList)).toEqual(expect.arrayContaining([
      'has-background-accent',
      'has-text-white',
    ]));
    expect(Object.values(wrapper.classList)).toEqual(expect.not.arrayContaining([
      'has-cursor-pointer',
      'has-background-transparent',
    ]));
  });
  it("toggles (on) weather-type on menu panel click", () => {

    const { queryByTestId } = render(renderPanelBlock(props));
    const wrapper = queryByTestId("apb--wrapper");
    expect(wrapper).not.toBe(null);

    userEvent.click(wrapper!);

    expect(mockDispatch).toBeCalledWith({ type: props.actionType, payload: props.actionPayload });

  });
  it("type remains on on menu panel reclick", () => {
    props.isActive = true;

    const { queryByTestId } = render(renderPanelBlock(props));
    const wrapper = queryByTestId("apb--wrapper");
    expect(wrapper).not.toBe(null);

    userEvent.click(wrapper!);

    expect(mockDispatch).toBeCalledWith({ type: props.actionType, payload: props.actionPayload });
  });
});
