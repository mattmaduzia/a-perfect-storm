import React from "react";
import { render } from "@testing-library/react";
import { AppPanel, AppPanelProps } from "../AppPanel";

describe("Block container", () => {
    it("", () => {
      const props: AppPanelProps = {
        title: "Test",
        children: <div></div>
      } as any;
      const { queryByText } = render(<AppPanel {...props} />);
      expect(queryByText("Test")).not.toBeNull();
    });
});
