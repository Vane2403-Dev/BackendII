import { Router } from "express";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";
import userRoutes from "./user.routes.js";
import authRouter from "./auth.routes.js";


const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/users", userRoutes); 
router.use("/auth", authRouter);

export default router;
