import userEvent from "@testing-library/user-event";
import { render, screen } from "test/testing-library-utils";

import SearchComponent from "../search/SearchComponent";
// import { consonants, vowels } from "constants/ipa";
// import IpaKeyboard from "../ipa-keyboard/IPAKeyboard";

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

// function sample(letters, count) {
//   const word = [];

//   for (let i = 0; i < count; i++) {
//     const randIdx = Math.floor(Math.random() * letters.length);
//     word.push(letters[randIdx]);
//   }

//   return word;
// }

// test("typing using ipa keyboard changes input on screen", () => {
//   const word = sample([...consonants, ...vowels], 5);
//   render(<SearchComponent />);

//   const searchInput = screen.getByRole("textbox", {
//     name: /search for word or phoneme/i,
//   });

//   console.log(screen.getAllByRole("button", { name: "p" }));
//   // word.forEach((letter) => {
//   // screen.getByText("dʒ");
//   // screen.getByRole("button", { name: /dʒ/i });
//   // userEvent.click(screen.getByText(letter));
//   // });

//   // expect(searchInput).toHaveTextContent(word.join(""));
// });
