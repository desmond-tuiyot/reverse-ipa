import axios from "axios";

let url = "http://localhost:5000/api/v1/search";

if (process.env.NODE_ENV === "production") {
  url = "https://reverse-ipa.herokuapp.com";
}

export const fetchResults = (term, type, position, skip) =>
  axios.get(url, {
    params: {
      term,
      type,
      position,
      skip,
    },
  });
