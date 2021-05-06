import { useLocation } from "react-router";

// custom hook to return parse and return url search params
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default useQuery;
