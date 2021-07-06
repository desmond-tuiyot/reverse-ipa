import userEvent from "@testing-library/user-event";
import { render, screen } from "test/testing-library-utils";

import SearchComponent from "../search/SearchComponent";

test("typing and clearing text works", () => {
  render(<SearchComponent />);

  const searchInput = screen.getByRole("textbox", {
    name: /search for word or phoneme/i,
  });
  userEvent.clear(searchInput);
  userEvent.type(searchInput, "random");

  expect(searchInput).toHaveValue("random");

  userEvent.clear(searchInput);
  expect(searchInput).toHaveValue("");
});
