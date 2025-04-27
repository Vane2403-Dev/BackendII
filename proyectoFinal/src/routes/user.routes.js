import { Router } from "express";
import { userExist } from "../middlewares/existUsers.middlewares.js";
import { userControllers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", userControllers.getAllUsers);

router.post("/", userControllers.createUsers);

router.get("/:id", userExist, userControllers.getOneUsers );

router.delete("/:id", userExist, userControllers.deleteUsers);

router.put("/:id", userExist, userControllers.updateUsers);

export default router;