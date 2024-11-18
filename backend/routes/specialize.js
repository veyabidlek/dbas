import { Router } from "express";
import {
  getAllSpecializes,
  createSpecialize,
  deleteSpecialize,
} from "../controllers/specializeController.js";

const SpecializeRouter = Router();

SpecializeRouter.get("/get", getAllSpecializes);
SpecializeRouter.post("/create", createSpecialize);
SpecializeRouter.delete("/delete", deleteSpecialize);

export default SpecializeRouter;
