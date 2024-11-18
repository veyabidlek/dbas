import { Router } from "express";
import {
  getAllPatientDiseases,
  createPatientDisease,
  deletePatientDisease,
} from "../controllers/patientDiseaseController.js";

const PatientDiseaseRouter = Router();

PatientDiseaseRouter.get("/get", getAllPatientDiseases);
PatientDiseaseRouter.post("/create", createPatientDisease);
PatientDiseaseRouter.delete("/delete", deletePatientDisease);
export default PatientDiseaseRouter;
