import * as React from "react";
import { useLocation } from "react-router-dom";

const useFetchData = () => {
  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState("idle"); // idle | loading | success | error
  const [error, setError] = React.useState();

  const { pathname, search } = useLocation();

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

  return { data, status, error, isLoading, isError, isEmpty };
};

export default useFetchData;
