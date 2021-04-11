import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import wordRoutes from "./routes/words.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/words", wordRoutes);

const CONNECTION_URL =
  "mongodb+srv://dtuiyot:dtuiyot1234@cluster0.6zkxx.mongodb.net/ReverseIPA?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Couldn't start server: Error: ${error.message}`);
  });

mongoose.set("useFindAndModify", false);
