import { Router } from "express";
import {
  getAllRecords,
  createRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/recordController.js";

const RecordRouter = Router();

RecordRouter.get("/get", getAllRecords);
RecordRouter.post("/create", createRecord);
RecordRouter.put("/update", updateRecord);
RecordRouter.delete("/delete", deleteRecord);

export default RecordRouter;
