import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { AppTopListSortButton } from "../AppTopListSortButton";

describe("button that changes sort orientation of top counties list", () => {
    it("toggles sort on click", () => {
      let sort = { asc: true };
      const setSortAsc = (newSortAsc: boolean) => {
        sort = { asc: newSortAsc };
      }

      const { rerender, getByTestId } = render(<AppTopListSortButton sortAsc={sort.asc} setSortAsc={setSortAsc}/>);

      const icon = getByTestId('atlsb--icon');
      expect(icon.classList).toContain("mdi-sort-ascending");

      const wrapper = getByTestId('atlsb--wrapper');
      fireEvent.click(wrapper);

      rerender(<AppTopListSortButton sortAsc={sort.asc} setSortAsc={setSortAsc}/>);

      const updatedIcon = getByTestId('atlsb--icon');
      expect(updatedIcon.classList).toContain("mdi-sort-descending");
    });
});
