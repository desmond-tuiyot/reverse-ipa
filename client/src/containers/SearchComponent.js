// import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";

import SearchBar from "../components/SearchBar";
import Filters from "./Filters";
import IPAKeyboard from "./IPAKeyboard";
import { updateSearchBar, fetchResults } from "../slices/search";
import {
  selectSearchTerm,
  selectSearchType,
  selectPosition,
  selectLoadedCount,
} from "../selectors";

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

const useChangeFilterOption = () => {
  const dispatch = useDispatch();
  const searchType = useSelector(selectSearchType);
  const position = useSelector(selectPosition);
  const loadedCount = useSelector(selectLoadedCount);

  useEffect(() => {
    dispatch(fetchResults());
  }, [searchType, position, loadedCount]);
};

/**
 * Holds the search bar, the filter, and the IPA keyboard
 */
const SearchComponent = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const searchType = useSelector(selectSearchType);
  const position = useSelector(selectPosition);
  const loadedCount = useSelector(selectLoadedCount);

  useChangeFilterOption();

  const dispatch = useDispatch();

  let history = useHistory();
  // let { pathname } = useLocation();

  const handleChange = (e) => {
    e.preventDefault();
    let value = e.target.value.trim().toLowerCase();
    dispatch(updateSearchBar(value));
  };

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(updateSearchBar(""));
  };

  const handleSearch = () => {
    if (searchTerm.length > 0) {
      dispatch(fetchResults());
      history.push(
        `/results/?term=${searchTerm}&type=${searchType}&position=${position}`
      );
    } else {
      console.log("damn you got it wrong fam");
    }
  };

  let searchProps = {
    searchTerm,
    handleChange,
    handleSearch,
    handleClear,
  };

  return (
    <>
      <Grid item xs={12}>
        <SearchBar {...searchProps} />
      </Grid>
      <Grid item xs={12}>
        <IPAKeyboard />
      </Grid>
      <Grid item xs={12}>
        <Filters handleSearch={handleSearch} />
      </Grid>
    </>
  );
};

SearchComponent.propTypes = {};

export default SearchComponent;
