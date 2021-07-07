import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  showIpaText: {
    fontSize: "0.9rem",
    textTransform: "capitalize",
    background: ({ showIpa }) => (showIpa ? theme.palette.grey["100"] : "none"),
    padding: theme.spacing(1),
    borderRadius: "10px 10px 0 0",
  },
  showIpaButton: {
    color: theme.palette.primary.main,
    fontSize: "0.9rem",
    textTransform: "capitalize",
    background: ({ showIpa }) => (showIpa ? theme.palette.grey["100"] : "none"),
    padding: theme.spacing(1),
    borderRadius: "10px 10px 0 0",
    fontWeight: 400,
  },
  keyboard: {
    background: theme.palette.grey["100"],
    padding: theme.spacing(1),
    borderRadius: "0 10px 10px 10px",
  },
}));

const VirtualKeyboard = ({ children }) => {
  const [showIpa, setShowIpa] = useState(false);

  const styleProps = {
    showIpa,
  };
  const classes = useStyles(styleProps);

  const handleShowIpa = () => {
    setShowIpa(!showIpa);
  };

  return (
    <Grid item xs={12} container justify="center">
      <Grid item xs={12}>
        <Button
          onClick={handleShowIpa}
          className={classes.showIpaButton}
          disableFocusRipple={true}
          disableRipple={true}
        >
          {showIpa ? "Hide IPA Keyboard" : "Show IPA Keyboard"}
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
          {children}
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default VirtualKeyboard;
