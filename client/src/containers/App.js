import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import theme from "../theme";
import HomePage from "./HomePage";
import SearchResultsPage from "./SearchResultsPage";
import store from "../store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          {/* <Navigation /> */}
          <Switch>
            <Route path="/results">
              <SearchResultsPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
