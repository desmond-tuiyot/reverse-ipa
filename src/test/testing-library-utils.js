import { render, fireEvent } from "@testing-library/react";

import { ThemeProvider } from "@material-ui/core/styles";
import { MemoryRouter } from "react-router-dom";
import theme from "../theme";

const AllTheProviders = ({ children, initialEntries = ["/"] }) => {
  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </ThemeProvider>
  );
};

const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const mouseDownEvent = (node) => {
  fireEvent.mouseMove(node);
  fireEvent.mouseOver(node);
  fireEvent.mouseDown(node);
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithProviders as render, mouseDownEvent };
