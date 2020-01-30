import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TopCounties } from "../../../../types/counties";
import { AppTopListSearch } from "../AppTopListSearch";
import { TopCountySummary } from "../../../../types/weather";
import { WeatherType, TimePeriod } from "../../../../types/enums";

describe("Filters top county list by search input", () => {
});
  const topCounties: TopCounties = {
    summary: [
      {
        rank: 1,
        name: "A",
        value: 0.8,
      },
      {
        rank: 2,
        name: "B",
        value: 0.5,
      },
      {
        rank: 3,
        name: "C",
        value: 0.3,
      },
    ],
    title: "Title",
    units: "Units",
    sortAsc: false,
    type: WeatherType.SnowDepth5,
    period: TimePeriod.Annual,
  };
it("filters the top-counties list correctly", () => {
  let filtered: TopCountySummary[] = [];
  const setFiltered = (newFiltered: TopCountySummary[]) => filtered = newFiltered;
  const { rerender, getByTestId, getByPlaceholderText } = render(<AppTopListSearch setFiltered={setFiltered} topCounties={topCounties}/>);

  const searchInput = getByPlaceholderText("Search");
  userEvent.type(searchInput, "A");

  expect(filtered).toEqual([{
    rank: 1,
    name: "A",
    value: 0.8,
  }]);

  userEvent.click(getByTestId("atls--button"));

  expect(( searchInput as any ).value).toBe("");
  expect(document.activeElement).toEqual(searchInput);
});
