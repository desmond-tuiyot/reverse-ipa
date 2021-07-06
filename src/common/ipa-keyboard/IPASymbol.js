import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  symbolContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: theme.typography.pxToRem(32),
    width: theme.typography.pxToRem(32),
    border: "1px solid grey",
    margin: "1px",
    "&:hover": {
      borderColor: theme.palette.primary.light,
      cursor: "pointer",
    },
    "&:active": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },
  },
  symbol: {
    fontSize: theme.typography.pxToRem(12),
  },
}));

const IPASymbol = ({ symbol, handleClick }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      className={classes.symbolContainer}
      role="button"
      onClick={() => {
        handleClick(symbol);
      }}
    >
      {/* <div role="button">{symbol}</div> */}
      <Typography className={classes.symbol}>{symbol}</Typography>
    </Grid>
  );
};

export default IPASymbol;
