import { render } from "@testing-library/react";

import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import theme from "../theme";
import store from "../store";

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithProviders as render };
