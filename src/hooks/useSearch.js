import * as React from "react";
import { useHistory } from "react-router-dom";
import { initialFilterValues } from "constants/filter-options";

// TODO: check state reducer pattern to make this more reusable
const useSearch = () => {
  let history = useHistory();
  const [query, setQuery] = React.useState("");
  const [filters, setFilters] = React.useState(initialFilterValues);

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
    const { type, position } = filters;
    history.push(`/search/?query=${query}&type=${type}&position=${position}`);
  };

  return {
    query,
    filters,
    handleChange,
    handleClear,
    handleVirtualKeyboardClick,
    handleFilterChange,
    handleSearch,
  };
};

export default useSearch;
