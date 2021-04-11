const fs = require("fs");

const en_US = require("./json/en_US.json");

const convertWordToIpa = (wordToIpa) => {
  let newWordToIpa = {};
  for (const word in wordToIpa) {
    if (Object.hasOwnProperty.call(wordToIpa, word)) {
      let ipas = wordToIpa[word].split(",");
      ipas = ipas.map((ipa) => {
        return ipa.trim();
      });
      // let ipasStripped = replace(/[\/ˈˌ]/g, '')
      newWordToIpa[word.toString()] = ipas;
    }
  }
  return newWordToIpa;
};

const createIpatoWord = (wordToIpa) => {
  let ipaToWord = {};
  for (const word in wordToIpa) {
    if (Object.hasOwnProperty.call(wordToIpa, word)) {
      let ipas = wordToIpa[word];
      ipas = ipas.forEach((ipa) => {
        if (ipa in ipaToWord) {
          ipaToWord[ipa].push(word);
        } else {
          ipaToWord[ipa] = [word];
        }
      });
    }
  }
  return ipaToWord;
};

const createCollection = (
  documents,
  propertyName,
  valueName,
  stripPname = false
) => {
  let count = 0;
  let collection = [];
  for (const key in documents) {
    if (Object.hasOwnProperty.call(documents, key)) {
      const document = documents[key];
      let newDocument = {
        [propertyName]: key,
        [valueName]: document,
      };

      if (stripPname) {
        newDocument[`${propertyName}Stripped`] = key.replace(/[\/ˈˌ]/g, "");
      } else {
        newDocument[`${valueName}Stripped`] = document.map((value) =>
          value.replace(/[\/ˈˌ]/g, "")
        );
      }
      collection.push(newDocument);
    }
    if (++count === 10) console.log(collection);
  }
  return collection;
};

const wordToIpa = convertWordToIpa(en_US["en_US"][0]);
const ipaToWord = createIpatoWord(wordToIpa);

const toIpaCollection = createCollection(
  wordToIpa,
  "word",
  "ipaTranscriptions",
  false
);

const toWordCollection = createCollection(
  ipaToWord,
  "ipaTranscription",
  "words",
  true
);

fs.writeFile(
  "./src/data/wordlist/enUS_toIPA.json",
  JSON.stringify(toIpaCollection),
  (error) => {
    if (error) {
      console.log(error);
      throw error;
    }
  }
);

fs.writeFile(
  "./src/data/wordlist/enUS_toWord.json",
  JSON.stringify(toWordCollection),
  (error) => {
    if (error) {
      console.log(error);
      throw error;
    }
  }
);
