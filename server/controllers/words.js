import IpaToWord from "../models/ipaToWord.js";
import WordToIpa from "../models/wordToIpa.js";

export const fetchResults = async (req, res) => {
  const { term, type, position } = req.params;
  const limit = parseInt(req.params.limit);
  const skip = parseInt(req.params.skip);
  try {
    let results;
    const regexTerm = generateRegex(position, term);
    if (type === "toWord") {
      results = await IpaToWord.find({
        ipaTranscriptionStripped: { $regex: regexTerm },
      })
        .skip(skip)
        .limit(limit)
        .exec();
    } else if (type === "toIpa") {
      results = await WordToIpa.find({
        word: { $regex: regexTerm },
      })
        .skip(skip)
        .limit(limit)
        .exec();
    }

    res.status(200).json(results ? results : []);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getSkipAndLimit = () => {};

const generateRegex = (position, term) => {
  if (position === "anywhere") {
    return term;
  } else if (position === "start") {
    return `^${term}`;
  } else if (position === "middle") {
    return `^(?!^${term})(?!.*${term}$)(?=.*${term}.*).*$`;
  } else if (position === "end") {
    return `${term}$`;
  }
};
