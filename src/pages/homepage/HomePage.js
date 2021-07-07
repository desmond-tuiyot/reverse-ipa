import * as React from "react";
import { Typography, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

import Appbar from "common/Appbar";
import SearchBar from "common/search/SearchBar";
import SearchFilters from "common/filter/SearchFilters";
import VirtualKeyboard from "common/ipa-keyboard/VirtualKeyboard";
import KeyboardSection from "common/ipa-keyboard/KeyboardSection";
import { consonants, vowels } from "constants/ipa";
import { filterDetails, initialFilterValues } from "constants/filter-options";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20vh",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10vh",
    },
    marginBottom: theme.spacing(2),
  },
  header: {
    fontWeight: "bold",
    fontSize: "96px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "calc(48px + (96 - 48) * (100vw - 320px) / (600 - 320))",
    },
    color: theme.palette.primary.dark,
    textAlign: "center",
    cursor: "default",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  let history = useHistory();

  const [query, setQuery] = React.useState("");
  const [filters, setFilters] = React.useState(initialFilterValues);

  const { type, position } = filters;

  const handleChange = (e) => {
    e.preventDefault();
    let value = e.target.value.trim().toLowerCase();
    setQuery(value);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setQuery("");
  };

  const handleSearch = () => {
    history.push(`/search/?query=${query}&type=${type}&position=${position}`);
  };

  const handleVirtualKeyboardClick = (symbol) => {
    setQuery((searchTerm) => searchTerm + symbol);
  };

  const handleFilterChange = (filter, value) => {
    setFilters((filters) => ({ ...filters, [filter]: value }));
  };

  return (
    <>
      <Container maxWidth="sm">
        <Appbar />
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="flex-start"
          className={classes.root}
        >
          <Grid item xs={12}>
            <Typography component="h1" className={classes.header}>
              Reverse IPA
            </Typography>
          </Grid>
          <SearchBar
            searchTerm={query}
            handleSearch={handleSearch}
            handleClear={handleClear}
            handleChange={handleChange}
          />
          <VirtualKeyboard>
            <KeyboardSection
              handleClick={handleVirtualKeyboardClick}
              title="consonants"
              symbols={consonants}
            />
            <KeyboardSection
              handleClick={handleVirtualKeyboardClick}
              title="vowels"
              symbols={vowels}
            />
          </VirtualKeyboard>
          <SearchFilters
            filters={filters}
            filterDetails={filterDetails}
            handleChange={handleFilterChange}
          />
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
