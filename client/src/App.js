import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import theme from "./theme";
// import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SearchResultsPage from "./components/SearchResultsPage";
import store from "./store";

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
