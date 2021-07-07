export const position = [
  { name: "anywhere", label: "Anywhere" },
  { name: "start", label: "Start Of Word" },
  { name: "middle", label: "Middle Of Word" },
  { name: "end", label: "End Of Word" },
];

export const language = [
  { name: "en_us", label: "English - USA" },
  // { name: "en_uk", label: "English - UK" },
];

export const type = [
  { name: "toWord", label: "Ipa To Word" },
  { name: "toIpa", label: "Word To IPA" },
];

const initialFilterValues = {
  position: "anywhere",
  language: "en_us",
  type: "toWord",
};

// export const sortOptions = [
//   { name: "relevance", label: "Relevance" },
//   { name: "alphabeticalDesc", label: "Alphabetical (Desc)" },
//   { name: "alphabeticalAsc", label: "Alphabetical (Asc)" },
//   { name: "frequency", label: "Frequency" },
// ];

const filterDetails = {
  type,
  position,
  language,
};

export { filterDetails, initialFilterValues };
