import { Router } from "express";

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

const UserRouter = Router();

UserRouter.get("/get", getAllUsers);
UserRouter.post("/create", createUser);
UserRouter.put("/update", updateUser);
UserRouter.delete("/delete", deleteUser);
export default UserRouter;
