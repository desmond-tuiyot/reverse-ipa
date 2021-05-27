import axios from "axios";

let url = "";

if (process.env.NODE_ENV === "production") {
  url = "https://reverse-ipa.herokuapp.com";
}

export const fetchResults = (term, type, position, skip) =>
  axios.get(`${url}/words/${term}/${type}/${position}/${skip}/40`);
