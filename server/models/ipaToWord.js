import mongoose from "mongoose";

const ipaToWordSchema = mongoose.Schema({
  ipaTranscription: String,
  ipaTranscriptionStripped: String,
  words: [String],
});

const IpaToWord = mongoose.model("IpaToWord", ipaToWordSchema);

export default IpaToWord;
