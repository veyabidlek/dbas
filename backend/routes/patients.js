import { Router } from "express";

import {
  getAllPatients,
  deletePatient,
  createPatient,
} from "../controllers/patientController.js";

const PatientRouter = Router();

PatientRouter.get("/get", getAllPatients);
PatientRouter.post("/create", createPatient);
PatientRouter.delete("/delete", deletePatient);
export default PatientRouter;
