import userEvent from "@testing-library/user-event";

import { render, screen } from "test/testing-library-utils";
import HomePage from "..";
import { consonants, vowels } from "constants/ipa";

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

  const searchButton = screen.getByRole("button", { name: "search" });
  expect(searchButton).toBeInTheDocument();

  const clearButton = screen.getByRole("button", { name: "clear" });
  expect(clearButton).toBeInTheDocument();

  // check that filters are rendered
  const typeFilter = screen.getByText(/ipa to word/i);
  expect(typeFilter).toBeInTheDocument();

  const positionFilter = screen.getByText(/anywhere/i);
  expect(positionFilter).toBeInTheDocument();

  const languageFilter = screen.getByText(/english - usa/i);
  expect(languageFilter).toBeInTheDocument();

  // check that show ipa keyboard option is rendered
  const ipaKeyboard = screen.getByRole("button", {
    name: /show ipa keyboard/i,
  });
  expect(ipaKeyboard).toBeInTheDocument();
});

test("ipa keyboard appears and disappears when clicking Show IPA Keyboard button", () => {
  render(<HomePage />);

  const ipaKeyboard = screen.getByRole("button", {
    name: /show ipa keyboard/i,
  });

  // check that button text changes on click + ipa keyboard shows
  userEvent.click(ipaKeyboard);
  expect(ipaKeyboard).toHaveTextContent(/hide ipa keyboard/i);

  consonants.forEach((char) => {
    let letter = screen.getByText(char, { exact: true });
    expect(letter).toBeInTheDocument();
  });

  vowels.forEach((char) => {
    let letter = screen.getByText(char, { exact: true });
    expect(letter).toBeInTheDocument();
  });

  // test that button text changes back + ipa keyboard is hidden
  userEvent.click(ipaKeyboard);
  expect(ipaKeyboard).toHaveTextContent(/show ipa keyboard/i);
});
