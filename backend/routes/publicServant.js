import { Router } from "express";
import {
  getAllPublicServants,
  createPublicServant,
  updatePublicServant,
  deletePublicServant,
} from "../controllers/publicServantController.js";

const PublicServantRouter = Router();

PublicServantRouter.get("/get", getAllPublicServants);
PublicServantRouter.post("/create", createPublicServant);
PublicServantRouter.put("/update", updatePublicServant);
PublicServantRouter.delete("/delete", deletePublicServant);
export default PublicServantRouter;
