import { rest } from "msw";

import { toIpaTestData, toWordTestData } from "test/data/test-data";

const url = "http://localhost:5000/api/v1/search";

export const handlers = [
  rest.get(url, (req, res, ctx) => {
    const type = req.url.searchParams.get("type");
    let result;
    if (type === "toIpa") {
      result = ctx.json(toIpaTestData);
    } else {
      result = ctx.json(toWordTestData);
    }
    return res(result);
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
