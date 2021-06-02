import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router";
import isEmpty from "lodash/isEmpty";

import SearchComponent from "common/search/SearchComponent";
import SearchResultsCard from "common/search/SearchResultsCard";
import {
  selectSearchResults,
  selectSearchType,
  selectDelayedSearchTerm,
  selectStatus,
} from "store/selectors";
import Appbar from "common/Appbar";
import NoResultsPage from "common/NoResultsPage";
import TopProgressBar from "common/TopProgressBar";
import {
  useUpdateSearchOnFilterChange,
  useUpdateSearchOnUrlChange,
} from "hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  let delayedSearchTerm = useSelector(selectDelayedSearchTerm);
  let status = useSelector(selectStatus);

  // updates search results based on filter changes
  useUpdateSearchOnFilterChange();

  // allows user to navigate using back and next buttons
  const paramsToWatch = ["type", "position", "term"];
  useUpdateSearchOnUrlChange(paramsToWatch);

  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleClick = () => {
    history.push("/");
  };

  const searchResultHeader =
    searchType === "toWord"
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

  return (
    <>
      <TopProgressBar />
      <Container maxWidth="sm" className={classes.root}>
        <Grid container spacing={3} justify="flex-end">
          {matches ? [order.overXs] : [order.underXs]}
          <SearchComponent />
          {!isEmpty(searchResults) ? (
            <Grid item xs={12}>
              <Typography className={classes.resultDescription}>
                {searchResultHeader}
                <span className={classes.searchTerm}>{delayedSearchTerm}</span>
              </Typography>
            </Grid>
          ) : status === "success" ? (
            <NoResultsPage />
          ) : null}
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
    </>
  );
};

export default SearchResultsPage;
