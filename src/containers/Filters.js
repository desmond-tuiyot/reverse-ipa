import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";

import FilterDropDown from "../components/FilterDropDown";
import { setFilters } from "../store/slices/search";
import { selectFilters } from "../store/selectors";
import filterOptions from "../constants/filter-options";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const { positions, languages, types } = filterOptions;

  const handleChange = (filter, value) => {
    dispatch(
      setFilters({
        ...filters,
        [filter]: value,
      })
    );
  };

  let filterDetails = [
    {
      filter: "searchType",
      value: filters.searchType,
      options: types,
    },
    {
      filter: "position",
      value: filters.position,
      options: positions,
    },
    {
      filter: "language",
      value: filters.language,
      options: languages,
    },
    // {
    //   value: sortOption,
    //   options: sortOptions,
    //   handleChange: handleSortOptionChange,
    // },
  ];

  return (
    <Grid container justify="center" spacing={2}>
      {filterDetails.map((filter, index) => (
        <FilterDropDown key={index} {...filter} handleChange={handleChange} />
      ))}
    </Grid>
  );
};

export default Filters;
