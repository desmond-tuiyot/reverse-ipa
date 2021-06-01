import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import IconButton from "@material-ui/core/IconButton";

import About from "./About";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.purples.superDark,
  },
}));

const Appbar = () => {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <a
        href="https://github.com/desmond-tuiyot/reverse-ipa"
        rel="noreferrer"
        target="_blank"
      >
        <IconButton className={classes.icon}>
          <GitHubIcon />
        </IconButton>
      </a>
      <a
        href="https://twitter.com/desmond_tuiyot"
        rel="noreferrer"
        target="_blank"
      >
        <IconButton className={classes.icon}>
          <TwitterIcon />
        </IconButton>
      </a>
      <About iconClass={classes.icon} />
    </div>
  );
};

export default Appbar;
