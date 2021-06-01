import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";

import IPASymbolContainer from "./IPASymbolContainer";
import { updateSearchBar } from "../../store/slices/search";
import { selectSearchTerm } from "../../store/selectors";
import { consonants, vowels } from "../../constants/ipa";

const useStyles = makeStyles((theme) => ({
  showIpaText: {
    fontSize: "0.9rem",
    textTransform: "capitalize",
    background: ({ showIpa }) => (showIpa ? theme.palette.grey["100"] : "none"),
    padding: theme.spacing(1),
    borderRadius: "10px 10px 0 0",
  },
  showIpaButton: {
    padding: 0,
  },
  keyboard: {
    background: theme.palette.grey["100"],
    padding: theme.spacing(1),
    borderRadius: "0 10px 10px 10px",
  },
}));

const IPAKeyboard = () => {
  const [showIpa, setShowIpa] = useState(false);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const styleProps = {
    showIpa,
  };
  const classes = useStyles(styleProps);

  const handleShowIpa = () => {
    setShowIpa(!showIpa);
  };

  const handleClick = (symbol) => {
    dispatch(updateSearchBar(searchTerm + symbol));
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Button onClick={handleShowIpa} className={classes.showIpaButton}>
          <Typography color="primary" className={classes.showIpaText}>
            {showIpa ? "Hide IPA Keyboard" : "Show IPA Keyboard"}
          </Typography>
        </Button>
      </Grid>
      <Collapse in={showIpa}>
        <Grid
          container
          item
          xs={12}
          justify="center"
          spacing={0}
          className={classes.keyboard}
        >
          <Grid item xs={12}>
            <IPASymbolContainer
              title="Consonants"
              symbols={consonants}
              handleClick={handleClick}
            />
          </Grid>
          <Grid item xs={12}>
            <IPASymbolContainer
              title="Vowels"
              symbols={vowels}
              handleClick={handleClick}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default IPAKeyboard;