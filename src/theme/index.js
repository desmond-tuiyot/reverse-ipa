import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontSize: 16,
  },

  palette: {
    primary: {
      main: "#8300D1",
    },
    purples: {
      superDark: "#67577F",
    },
  },
});

export default theme;
