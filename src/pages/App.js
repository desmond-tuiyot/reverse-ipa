import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import theme from "../theme";
import HomePage from "./homepage";
import Search from "./search";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
