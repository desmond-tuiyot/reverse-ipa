import { rest } from "msw";

const testToIpa = [
  {
    searchTerm: "advantest",
    searchResults: ["/ædˈvæntəst/"],
  },
  {
    searchTerm: "attests",
    searchResults: ["/əˈtɛs/", "/əˈtɛsts/"],
  },
  {
    searchTerm: "attest",
    searchResults: ["/əˈtɛst/"],
  },
  {
    searchTerm: "attested",
    searchResults: ["/əˈtɛstɪd/"],
  },
  {
    searchTerm: "attesting",
    searchResults: ["/əˈtɛstɪŋ/"],
  },
  {
    searchTerm: "bluntest",
    searchResults: ["/ˈbɫəntəst/"],
  },
];

const testToWord = [
  {
    searchTerm: "/əˈtɛstɪd/",
    searchResults: ["attested"],
  },
  {
    searchTerm: "/əˈtɛstɪŋ/",
    searchResults: ["attesting"],
  },
  {
    searchTerm: "/əˈtɛst/",
    searchResults: ["attest"],
  },
  {
    searchTerm: "/əˈtɛsts/",
    searchResults: ["attests"],
  },
  {
    searchTerm: "/ˈbədˈtɛst/",
    searchResults: ["bud-test"],
  },
  {
    searchTerm: "/kənˈtɛstənt/",
    searchResults: ["contestant"],
  },
  {
    searchTerm: "/ˈkɑntɛst/",
    searchResults: ["contest"],
  },
  {
    searchTerm: "/ˈkɑntɛsts/",
    searchResults: ["contest's", "contests"],
  },
  {
    searchTerm: "/kənˈtɛstənts/",
    searchResults: ["contestants"],
  },
];

export const handlers = [
  rest.get(
    "http://localhost:5000/words/test/toIpa/anywhere",
    (req, res, ctx) => {
      return res(ctx.json(testToIpa));
    }
  ),
  rest.get(
    "http://localhost:5000/words/tɛst/toWord/anywhere",
    (req, res, ctx) => {
      return res(ctx.json(testToWord));
    }
  ),
  rest.get(
    "http://localhost:5000/words/nonexistentword/toIpa/anywhere",
    (req, res, ctx) => {
      return res(ctx.json([]));
    }
  ),
  rest.get(
    "http://localhost:5000/words/nonexistentipa/toWord/anywhere",
    (req, res, ctx) => {
      return res(ctx.json([]));
    }
  ),
];
