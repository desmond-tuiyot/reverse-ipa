import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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
    <>
      <Paper
        className={classes.symbolContainer}
        elevation={0}
        square
        onClick={() => {
          handleClick(symbol);
        }}
      >
        <Typography className={classes.symbol}>{symbol}</Typography>
      </Paper>
    </>
  );
};

export default IPASymbol;
