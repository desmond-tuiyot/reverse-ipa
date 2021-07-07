import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, InputBase, Divider, IconButton } from "@material-ui/core";
import { Search as SearchIcon, Clear as ClearIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    display: "flex",
    alignItems: "center",
    height: "2rem",
    border: `1px solid ${theme.palette.primary.light}`,
    boxShadow: `0 0 1px 2px ${theme.palette.primary.light}`,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  divider: {
    height: 28,
    margin: 4,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchBar = ({ searchTerm, handleChange, handleSearch, handleClear }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={classes.root}>
        <InputBase
          value={searchTerm}
          className={classes.input}
          placeholder="Type a word or a phoneme to search"
          inputProps={{ "aria-label": "search for word or phoneme" }}
          onChange={handleChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <IconButton
          onClick={handleClear}
          className={classes.iconButton}
          aria-label="clear"
          disabled={searchTerm === ""}
        >
          <ClearIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          color="primary"
          onClick={handleSearch}
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
};

export default SearchBar;
