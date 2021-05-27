import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router";

import SearchComponent from "./SearchComponent";
import SearchResultsCard from "../components/SearchResultsCard";
import { selectSearchResults } from "../store/selectors";
import Appbar from "../components/Appbar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2vh",
  },
  header: {
    fontWeight: "bold",
    fontSize: "36px",
    color: theme.palette.primary.dark,
    // textAlign: "center",
  },
  headerDiv: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const SearchResultsPage = () => {
  const classes = useStyles();
  let searchResults = useSelector(selectSearchResults);
  let history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  console.log(matches);

  const handleClick = () => {
    history.push("/");
  };

  const order = {
    underXs: (
      <>
        <Grid item xs={12} sm={6}>
          <Appbar />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div onClick={handleClick} className={classes.headerDiv}>
            <Typography align="center" className={classes.header}>
              Reverse IPA
            </Typography>
          </div>
        </Grid>
      </>
    ),
    overXs: (
      <>
        <Grid item xs={12} sm={6}>
          <div onClick={handleClick} className={classes.headerDiv}>
            <Typography align="left" className={classes.header}>
              Reverse IPA
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Appbar />
        </Grid>
      </>
    ),
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} justify="flex-end" className={classes.root}>
        {matches ? [order.overXs] : [order.underXs]}
        {/* <Grid item xs={12} sm={6}>
          <div onClick={handleClick} className={classes.headerDiv}>
            <Typography align="left" className={classes.header}>
              Reverse IPA
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Appbar />
        </Grid> */}
        <SearchComponent />
        <Grid item xs={12}>
          {searchResults &&
            searchResults.map((result, index) => (
              <SearchResultsCard key={index} {...result} />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchResultsPage;
