import mongoose from "mongoose";

export const ipaToWordSchema = mongoose.Schema({
  ipaTranscription: String,
  ipaTranscriptionStripped: String,
  words: [String],
});

export const wordToIpaSchema = mongoose.Schema({
  word: String,
  ipaTranscriptions: [String],
  ipaTranscriptionsStripped: [String],
});
