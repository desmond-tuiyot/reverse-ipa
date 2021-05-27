import { useLocation } from "react-router";

const useQuery = (keys) => {
  const queryParams = new URLSearchParams(useLocation().search);
  return keys.map((key) => queryParams.get(key));
};

export default useQuery;
