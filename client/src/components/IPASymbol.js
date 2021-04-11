import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";

import { updateSearchBar, selectSearchTerm } from "../slices/searchSlice";

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

const IPASymbol = ({ symbol }) => {
  const classes = useStyles();
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateSearchBar(searchTerm + symbol));
  };

  return (
    <>
      <Paper
        className={classes.symbolContainer}
        elevation={0}
        square
        onClick={handleClick}
      >
        <Typography className={classes.symbol}>{symbol}</Typography>
      </Paper>
    </>
  );
};

export default IPASymbol;
