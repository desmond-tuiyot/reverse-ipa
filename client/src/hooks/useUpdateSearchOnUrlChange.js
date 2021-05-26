import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

import useQuery from "./useQuery";
import {
  updateSearchBar,
  fetchResults,
  setFilters,
} from "../store/slices/search";

const useUpdateSearchOnUrlChange = (paramsToWatch) => {
  const [queryType, queryPosition, queryTerm] = useQuery(paramsToWatch);
  let { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname === "/results/") {
      const filter = {
        queryType,
        queryPosition,
      };
      dispatch(updateSearchBar(queryTerm));
      dispatch(setFilters(filter));
      dispatch(fetchResults());
    }
  }, [queryType, queryPosition, queryTerm]);
};

export default useUpdateSearchOnUrlChange;
