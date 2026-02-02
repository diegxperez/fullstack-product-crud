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
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *          description: The Product ID
 *        name:
 *          type: integer
 *          example: Monitor Curvo de 49 Pulgadas
 *          description: The Product Name
 *        price:
 *          type: number
 *          example: 300
 *          description: The Product Price
 *        availability:
 *          type: boolean
 *          example: true
 *          description: The Product availability
 */

/**
 * @swagger
 * /api/products:
 *    get:
 *      summary: Get a list of products
 *      tags:
 *        - Products
 *      description: Return a list of products
 *      responses:
 *        200:
 *          description: Successful responses
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 *
 */
productsRouter.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Return a product based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product ot retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Not found
 *      400:
 *        description: Bad Request - Invalid ID
 */
productsRouter.get(
  "/:id",
  getProductByIdValidation,
  handleInputErrors,
  getProductById,
);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Creates a new product
 *    tags:
 *      - Products
 *    description: Return a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor Curvo 49 Pulgadas"
 *              price:
 *                type: number
 *                example: 399
 *    responses:
 *      201:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              #ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - invalid input data
 *
 */
productsRouter.post(
  "/",
  createProductValidation,
  handleInputErrors,
  createProduct,
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor Curvo 49 Pulgadas"
 *              price:
 *                type: number
 *                example: 399
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              #ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID or Invalid input date
 *      404:
 *        description: Product Not Found
 */

productsRouter.put(
  "/:id",
  putProductValidation,
  handleInputErrors,
  updateProduct,
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update Product availability
 *    tags:
 *      - Products
 *    description: Returns the updated availability
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *          description: Sucessful response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *      400:
 *          description: Bad Request - Invalid ID
 *      404:
 *          description: Product Not Found
 */

productsRouter.patch(
  "/:id",
  getProductByIdValidation,
  handleInputErrors,
  updateAvailability,
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delets a product by a given ID
 *    tags:
 *      - Products
 *    description: Returns a confirmation message
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to delete
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *          description: Sucessful response
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                value: 'Producto Eliminado'
 *      400:
 *          description: Bad Request - Invalid ID
 *      404:
 *          description: Product Not Found
 */

productsRouter.delete(
  "/:id",
  getProductByIdValidation,
  handleInputErrors,
  deteleProduct,
);

export default productsRouter;
