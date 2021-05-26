import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilters } from "../selectors";
import { fetchResults } from "../slices/search";

const useUpdateSearchOnFilterChange = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchResults());
  }, [filters]);
};

export default useUpdateSearchOnFilterChange;
