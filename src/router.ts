import { Router } from "express";
import {
  createProduct,
  deteleProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";
import {
  createProductValidation,
  getProductByIdValidation,
  putProductValidation,
} from "./middleware/product.validation";

const productsRouter = Router();

// Routing
productsRouter.get("/", getProducts);
productsRouter.get(
  "/:id",
  getProductByIdValidation,
  handleInputErrors,
  getProductById,
);

productsRouter.post(
  "/",
  createProductValidation,
  handleInputErrors,
  createProduct,
);

productsRouter.put(
  "/:id",
  putProductValidation,
  handleInputErrors,
  updateProduct,
);

productsRouter.patch(
  "/:id",
  getProductByIdValidation,
  handleInputErrors,
  updateAvailability,
);

productsRouter.delete(
  "/:id",
  getProductByIdValidation,
  handleInputErrors,
  deteleProduct,
);

export default productsRouter;
