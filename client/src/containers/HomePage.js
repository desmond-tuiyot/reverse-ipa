import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import SearchComponent from "./SearchComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20vh",
  },
  header: {
    fontWeight: "bold",
    fontSize: "96px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(48px + (96 - 48) * (100vw - 320px) / (600 - 320))",
    },
    color: theme.palette.primary.dark,
    textAlign: "center",
    cursor: "default",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="flex-start"
        className={classes.root}
      >
        <Grid item xs={12}>
          <Typography className={classes.header}>Reverse IPA</Typography>
        </Grid>
        <SearchComponent />
      </Grid>
    </Container>
  );
};

export default HomePage;
