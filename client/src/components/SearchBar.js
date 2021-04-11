import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import {
  updateSearchBar,
  selectSearchTerm,
  selectSearchType,
  selectSearchTermPosition,
  selectStatus,
  fetchResults,
  setSearchResults,
} from "../slices/searchSlice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    display: "flex",
    alignItems: "center",
    height: "2rem",
    border: `1px solid ${theme.palette.primary.light}`,
    boxShadow: `0 0 1px 2px ${theme.palette.primary.light}`,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  divider: {
    height: 28,
    margin: 4,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchBar = ({ searchTerm, handleSearch }) => {
  // const searchTerm = useSelector(selectSearchTerm);
  // const searchType = useSelector(selectSearchType);
  // const searchTermPosition = useSelector(selectSearchTermPosition);

  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  let history = useHistory();
  let query = useQuery();

  const classes = useStyles();

  // useEffect(() => {
  //   let currentTerm = query.get("term");
  //   if (currentTerm && status === "succeeded" && currentTerm !== searchTerm) {
  //     console.log(currentTerm, searchTermPosition);
  //     dispatch(updateSearchBar(currentTerm));
  //     dispatch(
  //       fetchResults({
  //         term: searchTerm,
  //         type: searchType,
  //         position: searchTermPosition,
  //       })
  //     );
  //   }
  // });

  const handleChange = (e) => {
    e.preventDefault();
    let value = e.target.value.trim().toLowerCase();
    dispatch(updateSearchBar(value));
  };

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(updateSearchBar(""));
  };

  // const handleSearch = () => {
  //   if (searchTerm.length > 0) {
  //     dispatch(setSearchResults([]));
  //     dispatch(
  //       fetchResults({
  //         term: searchTerm,
  //         type: searchType,
  //         position: searchTermPosition,
  //         skip: 0,
  //       })
  //     );
  //     history.push(
  //       `/results/?term=${searchTerm}&type=${searchType}&position=${searchTermPosition}`
  //     );
  //   } else {
  //     console.log("damn you got it wrong fam");
  //   }
  // };

  return (
    <Paper className={classes.root}>
      <InputBase
        value={searchTerm}
        className={classes.input}
        placeholder="Type a word or a phoneme to search"
        inputProps={{ "aria-label": "search for word or phoneme" }}
        onChange={handleChange}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <IconButton
        onClick={handleClear}
        className={classes.iconButton}
        aria-label="clear"
        disabled={searchTerm === ""}
      >
        <ClearIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        onClick={handleSearch}
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
