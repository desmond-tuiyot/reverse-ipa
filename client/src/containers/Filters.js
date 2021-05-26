import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";

import FilterDropDown from "../components/FilterDropDown";
import { setFilters } from "../slices/search";
import { selectFilters } from "../selectors";

const useStyles = makeStyles(() => ({
  filterRoot: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
}));

const positions = [
  { name: "anywhere", label: "Anywhere" },
  { name: "start", label: "Start Of Word" },
  { name: "middle", label: "Middle Of Word" },
  { name: "end", label: "End Of Word" },
];

const languages = [
  { name: "en_us", label: "English - USA" },
  { name: "en_uk", label: "English - UK" },
];

const types = [
  { name: "toWord", label: "Ipa To Word" },
  { name: "toIpa", label: "Word To IPA" },
];

// const sortByOptions = [
//   { name: "relevance", label: "Relevance" },
//   { name: "alphabeticalDesc", label: "Alphabetical (Desc)" },
//   { name: "alphabeticalAsc", label: "Alphabetical (Asc)" },
//   { name: "frequency", label: "Frequency" },
// ];

const Filters = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

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
