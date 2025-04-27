import { Router } from "express";
import { productControllers} from "../controllers/product.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { editProductSchema } from "../schemas/products.schema.js";





const router = Router();

router.get("/", productControllers.getAllProducts );

router.get("/:pid", productControllers.getProductsById  );

router.delete("/:pid", productControllers.deleteProducts);

router.put("/:pid",validateSchema(editProductSchema) , productControllers.updateProducts);

router.post("/",  productControllers.createProducts);
export default router;
