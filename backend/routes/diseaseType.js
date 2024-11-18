import { Router } from "express";

import {
  getAllDiseaseTypes,
  createDiseaseType,
  updateDiseaseType,
  deleteDiseaseType,
} from "../controllers/diseaseTypeController.js";

const DiseaseTypeRouter = Router();

DiseaseTypeRouter.get("/get", getAllDiseaseTypes);
DiseaseTypeRouter.post("/create", createDiseaseType);
DiseaseTypeRouter.put("/create", updateDiseaseType);
DiseaseTypeRouter.delete("/delete", deleteDiseaseType);
export default DiseaseTypeRouter;
