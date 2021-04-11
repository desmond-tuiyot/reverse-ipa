import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

import SearchComponent from "./SearchComponent";
import SearchResultsCard from "./SearchResultsCard";
import {
  selectSearchTerm,
  selectSearchResults,
  selectStatus,
  selectSearchTermPosition,
  selectSearchType,
  fetchResults,
  resetState,
} from "../slices/searchSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2vh",
  },
  header: {
    fontWeight: "bold",
    fontSize: "36px",
    color: theme.palette.primary.dark,
    textAlign: "center",
  },
  headerDiv: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  loadMore: {
    marginBottom: "1rem",
  },
}));

const SearchResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTermPosition, setSearchTermPosition] = useState([]);
  const dispatch = useDispatch();

  const classes = useStyles();
  const status = useSelector(selectStatus);
  let currentSearchTerm = useSelector(selectSearchTerm);
  let currentSearchResults = useSelector(selectSearchResults);
  let currentSearchTermPosition = useSelector(selectSearchTermPosition);
  const searchType = useSelector(selectSearchType);

  let history = useHistory();

  useEffect(() => {
    if (status === "succeeded") {
      setSearchTerm(currentSearchTerm);
      setSearchResults(currentSearchResults);
      setSearchTermPosition(currentSearchTermPosition);
    }
  }, [status]);

  const handleLoadMore = () => {
    dispatch(
      fetchResults({
        term: searchTerm,
        type: searchType,
        position: searchTermPosition,
        skip: currentSearchResults.length,
      })
    );
  };
  console.log(searchResults);

  const handleClickHome = () => {
    history.push("/");
    dispatch(resetState());
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} justify="center" className={classes.root}>
        <Grid item xs={12}>
          <div onClick={handleClickHome} className={classes.headerDiv}>
            <Typography className={classes.header}>Reverse IPA</Typography>
          </div>
        </Grid>
        <SearchComponent />
        <Grid item xs={12}>
          {searchResults.map((result) => (
            <SearchResultsCard
              key={
                searchType === "toIpa" ? result.word : result.ipaTranscription
              }
              searchTerm={
                searchType === "toIpa" ? result.word : result.ipaTranscription
              }
              searchResults={
                searchType === "toIpa" ? result.ipaTranscriptions : result.words
              }
            />
          ))}
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            fullWidth
            className={classes.loadMore}
            onClick={handleLoadMore}
          >
            <Typography color="primary">Load More</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchResultsPage;
