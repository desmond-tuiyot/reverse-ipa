import userEvent from "@testing-library/user-event";

import {
  render,
  screen,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
  renderNoRoute,
} from "test-utils/testing-library-utils";
import HomePage from "..";
import { consonants, vowels } from "constants/ipa";
import { toIpaTestData, toWordTestData } from "constants/test-data";
import { render as tlrender } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import SearchResultsPage from "../../results";

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

test("results are displayed when user searches for an ipa transcription of the word 'test'", async () => {
  // render(<HomePage />);
  renderNoRoute(
    <MemoryRouter initialEntries={["/"]}>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/results">
        <SearchResultsPage />
      </Route>
    </MemoryRouter>
  );

  // check that search input is rendered
  const searchInput = screen.getByRole("textbox", {
    name: /search for word or phoneme/i,
  });

  // type the search term -> 'test'
  userEvent.clear(searchInput);
  userEvent.type(searchInput, "test");

  // select Word to Ipa
  const typeFilter = screen.getByRole("button", { name: /Ipa To Word/i });
  // hate to use fireEvent but mouse up doesn't get triggered immediately
  fireEvent.mouseMove(typeFilter);
  fireEvent.mouseOver(typeFilter);
  fireEvent.mouseDown(typeFilter);

  const wordToIpa = screen.getByRole("option", { name: /Word to Ipa/i });
  userEvent.click(wordToIpa);

  // test that filter works
  expect(typeFilter).toHaveTextContent(/word to ipa/i);

  // test that
  const searchButton = screen.getByRole("button", { name: "search" });
  userEvent.click(searchButton);

  // wait for loading bar to disappear
  await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

  // check that the results appear for the search term
  toIpaTestData.forEach((data) => {
    const word = screen.getByText(data.word);
    expect(word).toBeInTheDocument();
    data.ipaTranscriptions.forEach((item) => {
      const ipaTranscription = screen.getByText(item);
      expect(ipaTranscription).toBeInTheDocument();
    });
  });
});
