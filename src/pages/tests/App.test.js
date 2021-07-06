import {
  render,
  screen,
  waitForElementToBeRemoved,
  mouseDownEvent,
} from "test/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { toIpaTestData, toWordTestData } from "test/data/test-data";
import { Route } from "react-router-dom";

import HomePage from "../homepage";
import SearchResultsPage from "../results";

test("searching for ipa transcription on homepage renders list of words that match that ipa transcription", async () => {
  render(
    <>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/results">
        <SearchResultsPage />
      </Route>
    </>
  );

  const searchInput = screen.getByRole("textbox", {
    name: /search for word or phoneme/i,
  });
  userEvent.clear(searchInput);
  userEvent.type(searchInput, "tɛst");

  // no neeed to change filter, just check that it's ipa to word
  screen.getByRole("button", { name: /ipa to word/i });

  userEvent.click(screen.getByRole("button", { name: /search/i }));

  await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

  toWordTestData.forEach((data) => {
    screen.getByText(data.ipaTranscription);
    data.words.forEach((word) => {
      screen.getByText(word);
    });
  });
});

test("searching for word on homepage renders list of ipa transcriptions for that word", async () => {
  render(
    <>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/results">
        <SearchResultsPage />
      </Route>
    </>
  );

  // 1. grab the search input and type 'test'
  const searchInput = screen.getByRole("textbox", {
    name: /search for word or phoneme/i,
  });
  userEvent.clear(searchInput);
  userEvent.type(searchInput, "test");

  // 2. change the filter to 'Ipa to Word'
  // grab and click the type filter
  const typeFilter = screen.getByRole("button", { name: /ipa to word/i });
  mouseDownEvent(typeFilter);

  // select the `word to ipa` option
  userEvent.click(screen.getByRole("option", { name: /word to ipa/i }));

  // check that filter is changed
  expect(typeFilter).toHaveTextContent(/word to ipa/i);

  // 3. test that clicking search button causes render of result
  userEvent.click(screen.getByRole("button", { name: /search/i }));

  // wait for loading bar to disappear
  await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));

  toIpaTestData.forEach((data) => {
    screen.getByText(data.word);
    data.ipaTranscriptions.forEach((transcription) => {
      screen.getByText(transcription);
    });
  });
});
