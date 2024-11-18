import { Router } from "express";
import {
  getAllDiseases,
  createDisease,
  updateDisease,
  deleteDisease,
} from "../controllers/diseaseController.js";

const DiseaseRouter = Router();

DiseaseRouter.get("/get", getAllDiseases);
DiseaseRouter.post("/create", createDisease);
DiseaseRouter.put("/create", updateDisease);
DiseaseRouter.delete("/delete", deleteDisease);
export default DiseaseRouter;
