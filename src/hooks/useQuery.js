import { useLocation } from "react-router";

const useQuery = (keys) => {
  const location = useLocation();
  if (location === undefined) return;
  const queryParams = new URLSearchParams(location.search);
  return keys.map((key) => queryParams.get(key));
};

export default useQuery;
