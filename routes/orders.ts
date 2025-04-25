import {Router} from "express"
import { VerifyErrors } from "../middlewares/verifyErrors"

import { createOrder } from "../controllers/orders"

import { check } from "express-validator"

const router = Router ();

router.post("/",[
    check("price","Precio Obligatorio").not().isEmpty(),
    check("total","El total es obligatorio").not().isEmpty(),
    check("shippingDetails","Los datos son obligatorios").not().isEmpty(),
    check("items","Los items son obligatorios").not().isEmpty(),
    VerifyErrors
], createOrder)

export default router