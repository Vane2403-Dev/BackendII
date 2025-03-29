import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { authRole } from "../middlewares/authRole.middleware.js";
import { createToken } from "../utils/jwt.js";  
import { checkTokenCookie } from "../middlewares/checkTokenCookie.middleware.js";




const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getOne({ email });

    if (!user || !( comparePassword(user.password, password))) {
      return res.status(401).json({ message: "Email o password invalido" });
    }
    // Guardamos la información del usuario en las session
    //req.session.user = user;

     // Creamos un token
     const tokenInfo = {
        _id: user._id,
        email: user.email,
        role: user.role,
      };
  
      const token = createToken(tokenInfo);

      /// guardar en cookie
       // Guardamos el token en una cookie
       res.cookie("token", token, { httpOnly: true });

   res.status(200).json({user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

  

  router.post("/register", async (req, res) => {
    try {
      console.log("Body recibido:", req.body); // 🛠 Verifica que el password llega correctamente
  
      const { email, password } = req.body;
   
      if (!password) return res.status(400).json({ message: "La contraseña es requerida" });
  
      const user = await userDao.getOne({ email });
      if (user) return res.status(400).json({ message: "Ya hay un usuario registrado con ese email" });
  
      const newUserData = {
        ...req.body,
        password: hashPassword(password),
      };
  
      const newUser = await userDao.create(newUserData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  });
  router.get("/profile", checkTokenCookie, authRole(["admin", "user"]), async (req, res) => {
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