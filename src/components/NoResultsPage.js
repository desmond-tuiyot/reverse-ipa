import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import notFound from "../assets/404.png";

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.palette.purples.superDark,
  },
}));

const NoResultsPage = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12}>
        <img src={notFound} width="100%" height="auto"></img>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" variant="h4" className={classes.text}>
          No Results Found
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" variant="body2" className={classes.text}>
          We can't find any words or IPA transcriptions based on your search
        </Typography>
      </Grid>
    </>
  );
};

export default NoResultsPage;
