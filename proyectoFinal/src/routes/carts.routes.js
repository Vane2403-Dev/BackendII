import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";



const router = Router();

router.post("/", cartController.createCart);

router.get("/:cid", cartController.getById);

router.post("/:cid/product/:pid", cartController.addProductToCart);

router.delete("/:cid/product/:pid", cartController.deleteProductsToCart);

router.put("/:cid/product/:pid", cartController.updateQuantityProductInCart);

router.delete("/:cid", cartController.clearProductsToCart);

export default router;
