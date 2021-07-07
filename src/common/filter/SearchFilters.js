import Grid from "@material-ui/core/Grid";

import FilterDropDown from "./FilterDropDown";

const SearchFilters = ({ filters, filterDetails, handleChange }) => {
  return (
    <Grid item xs={12} container justify="center" spacing={2}>
      {Object.keys(filterDetails).map((filterName, index) => (
        <FilterDropDown
          key={index}
          filter={filterName}
          value={filters[filterName]}
          options={filterDetails[filterName]}
          handleChange={handleChange}
        />
      ))}
    </Grid>
  );
};

export default SearchFilters;
