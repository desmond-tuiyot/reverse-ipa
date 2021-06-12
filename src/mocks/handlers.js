import { rest } from "msw";

import { toIpaTestData, toWordTestData } from "constants/test-data";

export const handlers = [
  rest.get(
    "http://localhost/words/test/toIpa/anywhere/0/40",
    (req, res, ctx) => {
      return res(ctx.json(toIpaTestData));
    }
  ),
  rest.get(
    "http://localhost/words/tɛst/toWord/anywhere/0/40",
    (req, res, ctx) => {
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
