import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import { AppTopListItem, AppTopListItemProps } from "../AppTopListItem";
import { WeatherUnits } from "../../../../types/enums";
import { act } from "react-dom/test-utils";

describe("a single county in the top list", () => {
  const props: AppTopListItemProps = {
    rank: 1,
    name: "Name",
    value: 2,
    units: WeatherUnits.CloudsBroken,
  };

  it("simply renders its props", () => {
    const { queryByText } = render(
      <AppTopListItem {...props} />
    );

    expect(queryByText(props.rank + "")).not.toBeNull();

    expect(queryByText(`${props.name}: ${props.value} ${props.units}`)).not.toBeNull();
  });
});
