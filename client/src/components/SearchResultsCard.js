import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  container: {
    padding: theme.spacing(1, 2),
  },
  resultDescription: {
    fontStyle: "italic",
    fontSize: theme.typography.pxToRem(10),
    color: "#684C78",
  },
  searchTermDiv: {
    marginRight: theme.spacing(2),
  },
  searchTerm: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#3D0161",
  },
  searchResultsDiv: {
    flexGrow: 1,
  },
  searchResults: {
    fontStyle: "italic",
    fontSize: theme.typography.pxToRem(12),
    color: "#3F115A",
  },

  chip: {
    marginRight: theme.spacing(1),
  },
  resultDiv: {
    display: "flex",
    flexDirection: "row",
  },
}));

const SearchResultsCard = ({ searchResults, searchTerm }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.resultDescription}>
            IPA transcription for "{searchTerm}"
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.resultDiv}>
            <div className={classes.searchTermDiv}>
              <Typography className={classes.searchTerm}>
                {searchTerm}
              </Typography>
            </div>
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
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchResultsCard;
