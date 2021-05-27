import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import theme from "../theme";
import store from "../store";
import HomePage from "./HomePage";
import SearchResultsPage from "./SearchResultsPage";

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
            <Route
              path="/"
              onEnter={() => {
                console.log("hje");
              }}
            >
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
