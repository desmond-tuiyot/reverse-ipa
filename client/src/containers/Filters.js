import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";

import FilterDropDown from "../components/FilterDropDown";
import {
  setFilters,
  // selectSortOption,
} from "../slices/search";
import { selectLanguage, selectPosition, selectSearchType } from "../selectors";

const useStyles = makeStyles((theme) => ({
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

const Filters = ({ handleSearch }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const position = useSelector(selectPosition);
  const language = useSelector(selectLanguage);
  const searchType = useSelector(selectSearchType);
  // const sortBy = useSelector(selectSortBy);

  const handleChange = (filter, value) => {
    dispatch(setFilters({ filter, value }));
  };

  let filters = [
    {
      filter: "searchType",
      value: searchType,
      options: types,
    },
    {
      filter: "position",
      value: position,
      options: positions,
    },
    {
      filter: "language",
      value: language,
      options: languages,
    },
    // {
    //   value: sortOption,
    //   options: sortOptions,
    //   handleChange: handleSortOptionChange,
    // },
  ];

  return (
    <div className={classes.filterRoot}>
      {filters.map((filter, index) => (
        <FilterDropDown key={index} {...filter} handleChange={handleChange} />
      ))}
    </div>
  );
};

export default Filters;
