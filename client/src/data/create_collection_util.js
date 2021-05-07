const fs = require("fs");

const getArgument = (flag) => {
  const index = process.argv.findIndex((arg) => arg === flag);
  if (index < 0) return undefined;
  return process.argv[index + 1];
};

const wordlist = require(getArgument("--filepath"));
const language = getArgument("--language");

const createWordToIpa = (wordToIpa) => {
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

const writeCollection = (toIpaCollection, toWordCollection, language) => {
  fs.writeFile(
    `./wordlist/${language}_toIPA.json`,
    JSON.stringify(toIpaCollection),
    (error) => {
      if (error) {
        console.log(error);
        throw error;
      }
    }
  );

  fs.writeFile(
    `./wordlist/${language}_toWord.json`,
    JSON.stringify(toWordCollection),
    (error) => {
      if (error) {
        console.log(error);
        throw error;
      }
    }
  );
};

const createAndWriteCollection = () => {
  const wordToIpa = createWordToIpa(wordlist[language][0]);
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

  writeCollection(toIpaCollection, toWordCollection, language);
};

createAndWriteCollection();
