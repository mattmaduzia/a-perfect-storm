import React from "react";
import userEvent from "@testing-library/user-event";
import { waitForElement, render, fireEvent } from "@testing-library/react";
import { AppTopListExpander } from "../AppTopListExpander";

describe("container that expands to show top county list on click", () => {
  it("toggles expand on click", () => {
    const { rerender, getByTestId } = render(<AppTopListExpander title="Title"/>);

    const expandee = getByTestId('atle--expandee');
    expect(expandee.classList).not.toContain("is-expanded");

    const expander = getByTestId('atle--expander');
    userEvent.click(expander);

    expect(expandee.classList).toContain("is-expanded");
  });
});
