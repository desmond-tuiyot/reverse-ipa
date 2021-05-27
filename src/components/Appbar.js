import { Link } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";

import About from "./About";

const Appbar = () => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <a href="https://github.com/desmond-tuiyot/reverse-ipa" target="_blank">
        <IconButton>
          <GitHubIcon />
        </IconButton>
      </a>
      <a href="https://twitter.com/desmond_tuiyot" target="_blank">
        <IconButton>
          <TwitterIcon />
        </IconButton>
      </a>
      <About />
    </div>
  );
};

export default Appbar;
