import userEvent from "@testing-library/user-event";
import { render, screen, mouseDownEvent } from "test/testing-library-utils";

import { positions, languages, types } from "constants/filter-options";
import Filters from "../filter/Filters";

const testFilterChange = (filterNode, filterText) => {
  mouseDownEvent(filterNode);
  userEvent.click(
    screen.getByRole("option", { name: filterText, exact: false })
  );
  expect(filterNode).toHaveTextContent(filterText);
};

test("user can change filter options", () => {
  render(<Filters />);

  // test for type filter -> changing from ipa to word and vice versa
  const typeFilter = screen.getByRole("button", { name: /ipa to word/i });

  types.forEach(({ label }) => {
    testFilterChange(typeFilter, label);
  });

  // test for position filter ->
  const positionFilter = screen.getByRole("button", { name: /anywhere/i });

  positions.forEach(({ label }) => {
    testFilterChange(positionFilter, label);
  });

  // test for languages filter
  const languageFilter = screen.getByRole("button", { name: /english - usa/i });

  languages.forEach(({ label }) => {
    testFilterChange(languageFilter, label);
  });
});
