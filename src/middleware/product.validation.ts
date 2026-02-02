import { body, param } from "express-validator";

export const productSchema = [
  body("name")
    .notEmpty()
    .withMessage("El nombre del Producto no puede ir vacio"),
  body("price")
    .notEmpty()
    .withMessage("El precio del Producto no puede ir vacio")
    .isNumeric()
    .withMessage("Valor no valido")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
];

export const createProductValidation = [...productSchema];

export const getProductByIdValidation = [
  param("id").isInt().withMessage("ID no valido"),
];

export const putProductValidation = [
  param("id").isInt().withMessage("ID no valido"),
  ...productSchema,
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido"),
];
