import axios from "axios";

const url = "http://localhost:5000/words";

export const fetchResults = (term, type, position, skip) =>
  axios.get(`${url}/results/${term}/${type}/${position}/${skip}/40`);
