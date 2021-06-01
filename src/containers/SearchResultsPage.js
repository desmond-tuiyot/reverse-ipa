import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router";

import SearchComponent from "./SearchComponent";
import SearchResultsCard from "../components/SearchResultsCard";
import {
  selectSearchResults,
  selectSearchType,
  selectSearchTerm,
} from "../store/selectors";
import Appbar from "../components/Appbar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2vh",
  },
  header: {
    fontWeight: "bold",
    fontSize: "36px",
    color: theme.palette.primary.dark,
  },
  headerDiv: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  resultDescription: {
    fontStyle: "italic",
    fontSize: theme.typography.pxToRem(11),
    color: theme.palette.purples.superDark,
  },
  searchTerm: {
    fontWeight: "bold",
  },
}));

const SearchResultsPage = () => {
  const classes = useStyles();
  let history = useHistory();
  const theme = useTheme();

  let searchResults = useSelector(selectSearchResults);
  let searchType = useSelector(selectSearchType);
  let searchTerm = useSelector(selectSearchTerm);

  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleClick = () => {
    history.push("/");
  };

  console.log(searchType);
  const searchResultHeader =
    searchType == "toWord"
      ? `Words containing the IPA symbol(s) `
      : `IPA transcription(s) for `;

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

  // console.log(searchResults);

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} justify="flex-end" className={classes.root}>
        {matches ? [order.overXs] : [order.underXs]}
        <SearchComponent />
        <Grid item xs={12}>
          <Typography className={classes.resultDescription}>
            {searchResultHeader}
            <span className={classes.searchTerm}>{searchTerm}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {searchResults &&
            searchResults.map((result, index) => (
              <SearchResultsCard
                key={index}
                {...result}
                header={searchResultHeader}
              />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchResultsPage;
