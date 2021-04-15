import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";

import MuiTSelect from "./MuiTSelect";
import {
  selectLanguage,
  setLanguage,
  selectSearchTermPosition,
  setPosition,
  selectSearchType,
  setSearchType,
  // selectSortOption,
  // setSortOption,
} from "../../slices/search";

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

// const sortOptions = [
//   { name: "relevance", label: "Relevance" },
//   { name: "alphabeticalDesc", label: "Alphabetical (Desc)" },
//   { name: "alphabeticalAsc", label: "Alphabetical (Asc)" },
//   { name: "frequency", label: "Frequency" },
// ];

const Filters = ({ handleSearch }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const position = useSelector(selectSearchTermPosition);
  const language = useSelector(selectLanguage);
  const searchType = useSelector(selectSearchType);
  // const sortOption = useSelector(selectSortOption);

  const handleChangePosition = (event) => {
    const newPosition = positions[event.target.value].name;
    dispatch(setPosition(newPosition));
    handleSearch();
  };

  const handleChangeLanguage = (event) => {
    const newLanguage = languages[event.target.value].name;
    dispatch(setLanguage(newLanguage));
    handleSearch();
  };

  const handleSearchTypeChange = (event) => {
    const newType = types[event.target.value].name;
    dispatch(setSearchType(newType));
    handleSearch();
  };

  // const handleSortOptionChange = (event) => {
  //   const newSortOption = sortOptions[event.target.value].name;
  //   dispatch(setSortOption(newSortOption));
  // };

  return (
    <div className={classes.filterRoot}>
      <MuiTSelect
        value={searchType}
        options={types}
        handleChange={handleSearchTypeChange}
      />
      <MuiTSelect
        value={position}
        options={positions}
        handleChange={handleChangePosition}
      />
      <MuiTSelect
        value={language}
        options={languages}
        handleChange={handleChangeLanguage}
      />
      {/* <MuiTSelect
        value={sortOption}
        options={sortOptions}
        handleChange={handleSortOptionChange}
      /> */}
    </div>
  );
};

export default Filters;
