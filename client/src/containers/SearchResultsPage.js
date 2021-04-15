import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

import SearchComponent from "./SearchComponent";
import SearchResultsCard from "../components/SearchResultsCard";
import { selectSearchResults } from "../selectors";
import { resetState } from "../slices/search";

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
}));

const SearchResultsPage = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  let searchResults = useSelector(selectSearchResults);
  let history = useHistory();

  const handleClick = () => {
    dispatch(resetState());
    history.push("/");
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} justify="center" className={classes.root}>
        <Grid item xs={12}>
          <div onClick={handleClick} className={classes.headerDiv}>
            <Typography className={classes.header}>Reverse IPA</Typography>
          </div>
        </Grid>
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
