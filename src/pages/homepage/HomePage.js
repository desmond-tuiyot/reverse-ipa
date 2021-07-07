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
import useSearch from "hooks/useSearch";

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

  const {
    query,
    filters,
    handleChange,
    handleClear,
    handleVirtualKeyboardClick,
    handleFilterChange,
    handleSearch,
  } = useSearch();

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
