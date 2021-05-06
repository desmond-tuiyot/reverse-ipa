// import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";

import SearchBar from "../components/SearchBar";
import Filters from "./Filters";
import IPAKeyboard from "./IPAKeyboard";
import {
  updateSearchBar,
  fetchResults,
  setFilters,
} from "../store/slices/search";
import {
  selectSearchTerm,
  selectLoadedCount,
  selectFilters,
} from "../store/selectors";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const useChangeFilterOption = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchResults());
  }, [filters]);
};

const useUrlChange = () => {};

/**
 * Holds the search bar, the filter, and the IPA keyboard
 */
const SearchComponent = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const { searchType, position } = useSelector(selectFilters);
  const loadedCount = useSelector(selectLoadedCount);

  useChangeFilterOption(); // updates search results based on filter changes
  const queryParams = useQuery();
  let { pathname } = useLocation();

  // useEffect(() => {
  //   if (pathname === "/results/") {
  //     const searchType = queryParams.get("type");
  //     const position = queryParams.get("position");
  //     const term = queryParams.get("term");
  //     const filter = {
  //       searchType,
  //       position,
  //     };
  //     console.log(queryParams);
  //     dispatch(updateSearchBar(term));
  //     dispatch(setFilters(filter));
  //     dispatch(fetchResults());
  //   }
  // }, [queryParams]);

  const dispatch = useDispatch();

  let history = useHistory();

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
