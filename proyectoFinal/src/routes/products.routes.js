import { Router } from "express";
import { productControllers} from "../controllers/product.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { editProductSchema } from "../schemas/products.schema.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authRole } from "../middlewares/authRole.middleware.js";





const router = Router();

router.get("/", productControllers.getAllProducts );

router.get("/:pid", productControllers.getProductsById  );

router.delete("/:pid",passportCall("jwt"),authRole(["admin"]), productControllers.deleteProducts);

router.put("/:pid",validateSchema(editProductSchema) ,passportCall("jwt"),authRole(["admin"]), productControllers.updateProducts);

router.post("/",passportCall("jwt"),authRole(["admin"]),  productControllers.createProducts);
export default router;
