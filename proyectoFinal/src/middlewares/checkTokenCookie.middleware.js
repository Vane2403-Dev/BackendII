import { userServices} from "../services/user.services.js";
import { verifyToken } from "../utils/jwt.js";

export const checkTokenCookie = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No se provee el token" });

    const decoded = verifyToken(token);
    const user = await userServices.getOne({ _id: decoded._id });
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    // Agregamos a la request el usuario
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};