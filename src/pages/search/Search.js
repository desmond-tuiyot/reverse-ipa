import * as React from "react";
import { Typography, Grid, Container, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router";

import SearchBar from "common/search/SearchBar";
import SearchFilters from "common/filter/SearchFilters";
import VirtualKeyboard from "common/ipa-keyboard/VirtualKeyboard";
import KeyboardSection from "common/ipa-keyboard/KeyboardSection";
import SearchResultsCard from "common/search/SearchResultsCard";
import Appbar from "common/Appbar";
import NoResultsPage from "common/NoResultsPage";
import TopProgressBar from "common/TopProgressBar";
import { filterDetails, initialFilterValues } from "constants/filter-options";
import { consonants, vowels } from "constants/ipa";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  header: {
    fontWeight: "bold",
    fontSize: "36px",
    color: theme.palette.primary.dark,
  },
  headerDiv: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  resultDescription: {
    fontStyle: "italic",
    fontSize: theme.typography.pxToRem(11),
    color: theme.palette.purples.superDark,
  },
  searchTerm: {
    fontWeight: "bold",
  },
}));

const formatResults = (results) => {
  return results.map((result) => {
    // does frontend know too much about the backend data?
    // is it ok for this to be dependent on the shape of the data/
    const toIpa = result.hasOwnProperty("word");
    return {
      searchTerm: toIpa ? result.word : result.ipaTranscription,
      searchResults: toIpa ? result.ipaTranscriptions : result.words,
    };
  });
};

const Search = () => {
  const classes = useStyles();

  let history = useHistory();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleClick = () => {
    history.push("/");
  };

  // Search States and Methods
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

  const handleVirtualKeyboardClick = (symbol) => {
    setQuery((searchTerm) => searchTerm + symbol);
  };

  const handleFilterChange = (filter, value) => {
    setFilters((filters) => ({ ...filters, [filter]: value }));
  };

  const handleSearch = () => {
    history.push(`/search/?query=${query}&type=${type}&position=${position}`);
  };

  // data fetching logic

  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState("idle"); // idle | loading | success | error
  const [error, setError] = React.useState();

  const { pathname, search } = useLocation();
  // console.log(pathname, search);

  React.useEffect(() => {
    (async () => {
      try {
        setStatus("loading");
        const res = await window.fetch(
          `http://localhost:5000/api/v1/search${search}&skip=0`,
          {
            method: "GET",
          }
        );

        if (!res.ok) {
          throw new Error("Network error");
        }

        const data = await res.json();
        setData(data);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setError(err.message);
      }
    })();
  }, [pathname, search]);

  const isLoading = status === "loading";
  const isError = status === "error";
  const isEmpty = status === "success" && data.length === 0;

  const searchResultHeader =
    type === "toWord"
      ? `Words containing the IPA symbol(s) `
      : `IPA transcription(s) for `;

  const order = {
    underXs: (
      <>
        <Grid item xs={12} sm={6}>
          <Appbar />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div onClick={handleClick} className={classes.headerDiv}>
            <Typography align="center" className={classes.header}>
              Reverse IPA
            </Typography>
          </div>
        </Grid>
      </>
    ),
    overXs: (
      <>
        <Grid item xs={12} sm={6}>
          <div onClick={handleClick} className={classes.headerDiv}>
            <Typography align="left" className={classes.header}>
              Reverse IPA
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Appbar />
        </Grid>
      </>
    ),
  };

  return (
    <>
      {isLoading && <TopProgressBar />}
      <Container maxWidth="sm" className={classes.root}>
        <Grid container spacing={3} justify="flex-end">
          {matches ? order.overXs : order.underXs}
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
          {isEmpty || isError ? (
            <NoResultsPage />
          ) : isLoading ? (
            <div>Loading ...</div>
          ) : (
            <Grid item xs={12}>
              {formatResults(data).map((result, index) => (
                <SearchResultsCard
                  key={index}
                  {...result}
                  header={searchResultHeader}
                />
              ))}
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Search;
