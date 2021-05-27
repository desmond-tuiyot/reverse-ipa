import { projectFirestore } from "./index";

import en_us_to_word from "../data/wordlist/enUS_toWord.json";
import en_us_to_ipa from "../data/wordlist/enUS_toIPA.json";

export const uploadData = () => {
  projectFirestore
    .collection("en_usa")
    .add({
      ipa_to_word: en_us_to_word,
      word_to_ipa: en_us_to_ipa,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

// uploadData();
