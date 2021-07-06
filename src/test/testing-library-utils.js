import { render } from "@testing-library/react";

import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../store";
import theme from "../theme";

const AllTheProviders = ({ children, initialEntries = ["/"] }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
};

const AllTheProvidersMinusRoute = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const renderWithOutRoute = (ui, options) =>
  render(ui, { wrapper: AllTheProvidersMinusRoute, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithProviders as render, renderWithOutRoute as renderNoRoute };
