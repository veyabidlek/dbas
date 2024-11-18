import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import globalRouter from "./routes/globalRouter.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(globalRouter);

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
