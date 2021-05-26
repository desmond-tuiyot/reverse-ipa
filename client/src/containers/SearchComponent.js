import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import SearchBar from "../components/SearchBar";
import Filters from "./Filters";
import IPAKeyboard from "./IPAKeyboard";
import { updateSearchBar, fetchResults } from "../store/slices/search";
import {
  selectSearchTerm,
  selectLoadedCount,
  selectFilters,
} from "../store/selectors";
import {
  useUpdateSearchOnFilterChange,
  useUpdateSearchOnUrlChange,
} from "../hooks";

/**
 * Holds the search bar, the filter, and the IPA keyboard
 */
const SearchComponent = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const searchTerm = useSelector(selectSearchTerm);
  const { searchType, position } = useSelector(selectFilters);
  const loadedCount = useSelector(selectLoadedCount);

  useUpdateSearchOnFilterChange(); // updates search results based on filter changes
  // allows user to navigate using back and next buttons
  const paramsToWatch = ["type", "position", "term"];
  useUpdateSearchOnUrlChange(paramsToWatch);

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
