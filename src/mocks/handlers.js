import { rest } from "msw";

import { toIpaTestData, toWordTestData } from "constants/test-data";

const url = "http://localhost:5000/api/v1/search";

export const handlers = [
  rest.get(url, (req, res, ctx) => {
    // console.log(url);
    // console.log(res);
    return res(ctx.json(toIpaTestData));
  }),
  rest.get(
    "http://localhost/words/tɛst/toWord/anywhere/0/40",
    (req, res, ctx) => {
      console.log("som othe");
      return res(ctx.json(toWordTestData));
    }
  ),
  rest.get(
    "http://localhost/words/nonexistentword/toIpa/anywhere/0/40",
    (req, res, ctx) => {
      return res(ctx.json([]));
    }
  ),
  rest.get(
    "http://localhost/words/nonexistentipa/toWord/anywhere/0/40",
    (req, res, ctx) => {
      return res(ctx.json([]));
    }
  ),
];
