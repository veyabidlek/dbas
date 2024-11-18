import { Router } from "express";
import {
  getAllDiscovers,
  createDiscover,
  updateDiscover,
  deleteDiscover,
} from "../controllers/discoverController.js";

const DiscoverRouter = Router();

DiscoverRouter.get("/get", getAllDiscovers);
DiscoverRouter.post("/create", createDiscover);
DiscoverRouter.put("/create", updateDiscover);
DiscoverRouter.delete("/delete", deleteDiscover);
export default DiscoverRouter;
