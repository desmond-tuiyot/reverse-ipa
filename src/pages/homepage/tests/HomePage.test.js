import { render, screen } from "../../../test-utils/testing-library-utils";
import HomePage from "..";

test("it displays site title", () => {
  render(<HomePage />);

  const siteTitle = screen.getByRole("heading", { name: /reverse ipa/i });
  expect(siteTitle).toBeInTheDocument();
});

test("it displays search bar and filters", () => {});
