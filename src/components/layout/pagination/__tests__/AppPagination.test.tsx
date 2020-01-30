import React from "react";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { AppPaginationProps, AppPagination } from "../AppPagination";

describe("A basic pagination component", () => {
    let props: AppPaginationProps;
    beforeEach(() => {
        props = {
            page: 1,
            setPage: (pageNumber: number) => props.page = pageNumber,
            totalItems: 20,
            perPage: 1,
        }
    });

    it("displays properly when first page is current", () => {
        const { getAllByTestId, getByTestId, getByText, getAllByText } = render(<AppPagination {...props} />);
        expect(getAllByText("…")).toHaveLength(2);
        expect(getByTestId("apag--first")).toHaveClass("is-disabled");
        expect(getByTestId("apag--prev")).toHaveClass("is-disabled");
        expect(getByTestId("apag--last")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--next")).not.toHaveClass("is-disabled");
        expect(getByText("1")).toHaveClass("is-current");
        expect(getAllByTestId("apag--link")).toHaveLength(4);
    });
    it("displays properly when last page is current", () => {
        props.page = 20;
        const { getAllByTestId, getByTestId, getByText, getAllByText } = render(<AppPagination {...props} />);
        expect(getAllByText("…")).toHaveLength(2);
        expect(getByTestId("apag--first")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--prev")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--last")).toHaveClass("is-disabled");
        expect(getByTestId("apag--next")).toHaveClass("is-disabled");
        expect(getByText("20")).toHaveClass("is-current");
        expect(getAllByTestId("apag--link")).toHaveLength(4);
    });
    it("displays properly when middle page is current", () => {
        props.page = 10;
        const { getAllByTestId, getByTestId, getByText, getAllByText } = render(<AppPagination {...props} />);
        // apag--link, first, prev, next, last
        expect(getAllByText("…")).toHaveLength(2);
        expect(getByTestId("apag--first")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--prev")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--last")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--next")).not.toHaveClass("is-disabled");
        expect(getByText("10")).toHaveClass("is-current");
        expect(getAllByTestId("apag--link")).toHaveLength(5);
    });
    it("displays properly when 3/4 page is current", () => {
        props.page = 15;
        const { getAllByTestId, getByTestId, getByText, getAllByText } = render(<AppPagination {...props} />);
        // apag--link, first, prev, next, last
        expect(getAllByText("…")).toHaveLength(3);
        expect(getByTestId("apag--first")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--prev")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--last")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--next")).not.toHaveClass("is-disabled");
        expect(getByText("15")).toHaveClass("is-current");
        expect(getAllByTestId("apag--link")).toHaveLength(6);
    });
    it("displays properly when 3/4 page is current", () => {
        props.page = 15;
        const { getAllByTestId, getByTestId, getByText, getAllByText } = render(<AppPagination {...props} />);
        // apag--link, first, prev, next, last
        expect(getAllByText("…")).toHaveLength(3);
        expect(getByTestId("apag--first")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--prev")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--last")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--next")).not.toHaveClass("is-disabled");
        expect(getByText("15")).toHaveClass("is-current");
        expect(getAllByTestId("apag--link")).toHaveLength(6);
    });
    it("displays properly when 1/4 page is current", () => {
        props.page = 5;
        const { getAllByTestId, getByTestId, getByText, getAllByText } = render(<AppPagination {...props} />);
        // apag--link, first, prev, next, last
        expect(getAllByText("…")).toHaveLength(3);
        expect(getByTestId("apag--first")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--prev")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--last")).not.toHaveClass("is-disabled");
        expect(getByTestId("apag--next")).not.toHaveClass("is-disabled");
        expect(getByText("5")).toHaveClass("is-current");
        expect(getAllByTestId("apag--link")).toHaveLength(6);
    });
});
