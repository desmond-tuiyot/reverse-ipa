import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useSelector } from "react-redux";

import { selectStatus } from "store/selectors";

const TopProgressBar = () => {
  const status = useSelector(selectStatus);

  if (status !== "loading") return null;
  return (
    <div style={{ width: "100%" }}>
      <LinearProgress />
    </div>
  );
};

export default TopProgressBar;
