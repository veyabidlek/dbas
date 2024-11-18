import { Router } from "express";
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const DoctorRouter = Router();

DoctorRouter.get("/get", getAllDoctors);
DoctorRouter.post("/create", createDoctor);
DoctorRouter.put("/create", updateDoctor);
DoctorRouter.delete("/delete", deleteDoctor);

export default DoctorRouter;
