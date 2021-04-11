import mongoose from "mongoose";

const wordToIpaSchema = mongoose.Schema({
  word: String,
  ipaTranscriptions: [String],
  ipaTranscriptionsStripped: [String],
});

const WordToIpa = mongoose.model("WordToIpa", wordToIpaSchema);

export default WordToIpa;
