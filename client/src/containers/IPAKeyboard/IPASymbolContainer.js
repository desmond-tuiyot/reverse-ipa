import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import IPASymbol from "./IPASymbol";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 0, 1, 0),
  },
  titleContainer: {
    marginLeft: "5px",
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: theme.typography.pxToRem(14),
    // opacity: 0.6,
  },
}));

const IPASymbolContainer = ({ title, symbols, handleClick }) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <Container disableGutters>
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography color="primary" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          {symbols.map((symbol, index) => (
            <Grid item key={index}>
              <IPASymbol symbol={symbol} handleClick={handleClick} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};

export default IPASymbolContainer;
