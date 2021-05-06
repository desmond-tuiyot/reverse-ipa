import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

import useQuery from "./useQuery";

// custom hook to set search term and filters when a page with
// query string params first loads -  enables refresh, back, next
const useUrlChange = (setSearchTerm, setFilters) => {
  const dispatch = useDispatch();
  const queryParams = useQuery();
  let { pathname, search } = useLocation();

  const searchTerm = queryParams.get("term");
  const searchType = queryParams.get("type");
  const position = queryParams.get("position");

  useEffect(() => {
    if (pathname === "/results/") {
      if (!searchTerm) return;
      dispatch(setSearchTerm(searchTerm));
      dispatch(
        setFilters({
          searchType,
          position,
        })
      );
    }
  }, [
    search,
    dispatch,
    pathname,
    position,
    searchTerm,
    searchType,
    setFilters,
    setSearchTerm,
  ]);
};

export default useUrlChange;
