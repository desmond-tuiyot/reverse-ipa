import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFilterSearchResults = (selectFilters, fetchResults) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchResults());
  }, [dispatch, fetchResults, filters]);
};

export default useFilterSearchResults;
