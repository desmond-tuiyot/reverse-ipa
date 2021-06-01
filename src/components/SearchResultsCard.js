import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
    borderRadius: 10,
  },
  container: {
    padding: theme.spacing(1, 2),
  },

  searchTerm: {
    fontWeight: "bold",
    fontSize: "1rem",
  },

  searchResultsDiv: {
    flexGrow: 1,
  },

  searchResults: {
    fontStyle: "italic",
    fontSize: theme.typography.pxToRem(12),
  },

  chip: {
    marginRight: theme.spacing(1),
  },
}));

const SearchResultsCard = ({ searchResults, searchTerm, header }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.searchTerm}>{searchTerm}</Typography>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.searchResultsDiv}>
            {searchResults &&
              searchResults.map((ipaTranscription, index) => (
                <Chip
                  key={index}
                  className={classes.chip}
                  label={ipaTranscription}
                  variant="outlined"
                  color="primary"
                  size="small"
                />
              ))}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchResultsCard;
