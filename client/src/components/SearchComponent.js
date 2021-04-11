// import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
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
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import IPAKeyboard from "./IPAKeyboard";
/**
 * Holds the search bar, the filter, and the IPA keyboard
 */
const SearchComponent = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const searchType = useSelector(selectSearchType);
  const searchTermPosition = useSelector(selectSearchTermPosition);

  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  let history = useHistory();

  const handleSearch = () => {
    if (searchTerm.length > 0) {
      dispatch(setSearchResults([]));
      dispatch(
        fetchResults({
          term: searchTerm,
          type: searchType,
          position: searchTermPosition,
          skip: 0,
        })
      );
      history.push(
        `/results/?term=${searchTerm}&type=${searchType}&position=${searchTermPosition}`
      );
    } else {
      console.log("damn you got it wrong fam");
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <SearchBar
          searchTerm={searchTerm}
          searchType={searchType}
          searchTermPosition={searchTermPosition}
          handleSearch={handleSearch}
        />
      </Grid>
      <Grid item xs={12}>
        <IPAKeyboard />
      </Grid>
      <Grid item xs={12}>
        <Filters
          searchTerm={searchTerm}
          searchType={searchType}
          searchTermPosition={searchTermPosition}
          handleSearch={handleSearch}
        />
      </Grid>
    </>
  );
};

SearchComponent.propTypes = {};

export default SearchComponent;
