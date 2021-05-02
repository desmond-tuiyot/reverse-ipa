// import { createMuiTheme } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontSize: 16,

    // "@media (min-width: 400px)": {
    //   fontSize: "calc(16px + (24 - 16) * (100vw - 400px) / (960 - 400))",
    // },
    // "@media (min-width: 960px)": {
    //   fontSize: 24,
    // },
  },

  palette: {
    primary: {
      main: "#8300D1",
    },
  },
});

export default theme;
