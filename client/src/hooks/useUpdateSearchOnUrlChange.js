import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

import useQuery from "./useQuery";
import {
  updateSearchBar,
  fetchResults,
  setFilters,
} from "../store/slices/search";
import filterOptions from "../constants/filter-options";

const useUpdateSearchOnUrlChange = (paramsToWatch) => {
  let [queryType, queryPosition, queryTerm] = useQuery(paramsToWatch);
  let { pathname } = useLocation();
  const dispatch = useDispatch();

  const validTypes = filterOptions.types.map((type) => type.name);
  const validPositions = filterOptions.positions.map(
    (position) => position.name
  );

  queryType = validTypes.includes(queryType) ? queryType : "toWord";
  queryPosition = validPositions.includes(queryPosition)
    ? queryPosition
    : "anywhere";

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
