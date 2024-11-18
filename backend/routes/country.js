import { Router } from "express";
import {
  getAllCountries,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../controllers/countryController.js";

const CountryRouter = Router();

CountryRouter.get("/get", getAllCountries);
CountryRouter.post("/create", createCountry);
CountryRouter.put("/update", updateCountry);
CountryRouter.delete("/delete", deleteCountry);
export default CountryRouter;
