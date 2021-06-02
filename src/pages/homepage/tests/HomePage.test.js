import { render, screen } from "../../../test-utils/testing-library-utils";
import HomePage from "..";

test("it displays site title, search bar and filters", () => {
  render(<HomePage />);

  // check that site title is rendered
  const siteTitle = screen.getByRole("heading", { name: /reverse ipa/i });
  expect(siteTitle).toBeInTheDocument();

  // check that search input is rendered
  const searchInput = screen.getByRole("textbox", {
    name: /search for word or phoneme/i,
  });
  expect(searchInput).toBeInTheDocument();

  // check that filters are rendered
  const typeFilter = screen.getByText(/ipa to word/i);
  expect(typeFilter).toBeInTheDocument();

  const positionFilter = screen.getByText(/anywhere/i);
  expect(positionFilter).toBeInTheDocument();

  const languageFilter = screen.getByText(/english - usa/i);
  expect(languageFilter).toBeInTheDocument();

  // check that show ipa keyboard option is rendered
  const ipaKeyboard = screen.getByText(/show ipa keyboard/i);
  expect(ipaKeyboard).toBeInTheDocument();
});
