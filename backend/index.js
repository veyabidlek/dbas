import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import globalRouter from "./routes/globalRouter.js";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(globalRouter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
