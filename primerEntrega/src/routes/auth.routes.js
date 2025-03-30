import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { authRole } from "../middlewares/authRole.middleware.js";
import { createToken } from "../utils/jwt.js";  
//import { checkTokenHeader } from "../middlewares/checkTokenHeader.middleware.js";
//import { checkTokenCookie } from "../middlewares/checkTokenCookie.middleware.js";
import passport from "passport";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { validateSchema  } from "../middlewares/validateSchema.middleware.js";
import { loginSchema } from "../schemas/login.schemas.js";
import { registerSchema } from "../schemas/register.schema.js";






const router = Router();

router.post("/login", validateSchema(loginSchema),passportCall("login"), async (req, res) => {
  try {
    const tokenData = {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    }
    const token = createToken(tokenData)
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json ({user: req.user, token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});


  router.post("/register", validateSchema(registerSchema), passportCall("register"), async (req, res) => {
  try {
    res.status(201).json ({mensage: "usuario Registrado"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
  
  });
    
  router.get("/sessions/current", passportCall("jwt"), authRole(["admin", "user"]), async (req, res) => {
    try {
      res.status(200).json({ user: req.user });
    } catch (error) {
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  });

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: "Session cerrada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

export default router;