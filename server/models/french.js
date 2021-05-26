import mongoose from "mongoose";
import { wordToIpaSchema, ipaToWordSchema } from "./ipaModels.js";

const fr_FR_IpaToWord = mongoose.model("fr_FR_IpaToWord", ipaToWordSchema);
const fr_FR_WordToIpa = mongoose.model("fr_FR_WordToIpa", wordToIpaSchema);
const fr_QC_IpaToWord = mongoose.model("fr_QC_IpaToWord", ipaToWordSchema);
const fr_QC_WordToIpa = mongoose.model("fr_QC_WordToIpa", wordToIpaSchema);

export { fr_FR_IpaToWord, fr_FR_WordToIpa, fr_QC_IpaToWord, fr_QC_WordToIpa };
