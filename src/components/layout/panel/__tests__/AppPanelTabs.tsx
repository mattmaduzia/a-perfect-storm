import React from "react";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { AppPanelTabs, AppPanelTabsProps } from "../AppPanelTabs";
import { AppAxesTabNames } from "../../AppAxes";

describe("tab links for a panel", () => {
  const props: AppPanelTabsProps = {
    activeTab: 1,
    setActiveTab: (newActiveTab: number) => props.activeTab = newActiveTab,
    tabNames: AppAxesTabNames,
  };
  test.each([
    [0, false],
    [1, true],
    [2, false],
  ])('%#) expects tab %i to be active',
    // @ts-ignore
    (tabNumber: number, expected: boolean) => {
      const { queryByText } = render(<AppPanelTabs {...props}/>);
      const tab = queryByText(AppAxesTabNames[tabNumber])!;
      expect(tab).not.toBeNull();
      expect(Object.values(tab.classList).includes('is-active')).toBe(expected);
    });
  it("changes active tab on click", () => {
    const { queryByText } = render(<AppPanelTabs {...props} />);
    const tab = queryByText(AppAxesTabNames[0])!;
    expect(tab).not.toBeNull();
    expect(tab.classList).not.toContain('is-active');

    userEvent.click(tab);

    expect(props.activeTab).toBe(0);
  });
});
