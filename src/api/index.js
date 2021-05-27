import axios from "axios";

export const fetchResults = (term, type, position, skip) =>
  axios.get(`/words/${term}/${type}/${position}/${skip}/40`);
