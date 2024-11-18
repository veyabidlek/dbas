import UserRouter from "./users.js";
import PatientRouter from "./patients.js";
import DiseaseTypeRouter from "./diseaseType.js";
import CountryRouter from "./country.js";
import DiseaseRouter from "./disease.js";
import DiscoverRouter from "./discover.js";
import PublicServantRouter from "./publicServant.js";
import DoctorRouter from "./doctor.js";
import PatientDiseaseRouter from "./patientDisease.js";
import SpecializeRouter from "./specialize.js";
import RecordRouter from "./record.js";
import { Router } from "express";

const globalRouter = Router();

globalRouter.use("/users/", UserRouter);
globalRouter.use("/patients/", PatientRouter);
globalRouter.use("/disease-type/", DiseaseTypeRouter);
globalRouter.use("/countries/", CountryRouter);
globalRouter.use("/diseases/", DiseaseRouter);
globalRouter.use("/discover/", DiscoverRouter);
globalRouter.use("/public-servant/", PublicServantRouter);
globalRouter.use("/doctor/", DoctorRouter);
globalRouter.use("/patient-disease/", PatientDiseaseRouter);
globalRouter.use("/specialize/", SpecializeRouter);
globalRouter.use("/record/", RecordRouter);
export default globalRouter;
