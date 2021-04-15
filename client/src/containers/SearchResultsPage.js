import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

import SearchComponent from "./SearchComponent";
import SearchResultsCard from "../containers/SearchResultsCard";
import { selectSearchResults } from "../slices/search";

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
  let searchResults = useSelector(selectSearchResults);
  let history = useHistory();

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} justify="center" className={classes.root}>
        <Grid item xs={12}>
          <div
            onClick={() => {
              history.push("/");
            }}
            className={classes.headerDiv}
          >
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
