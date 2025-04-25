import {Router} from "express"
import { VerifyErrors } from "../middlewares/verifyErrors"

import { createOrder } from "../controllers/orders"

import { check } from "express-validator"

const router = Router ();

router.get("/", (req,res)=>{
    const htmlResponse = `
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="styles.css">
            <title>orderAPI Documentacion</title>
        </head>
        <body>
            <div class="header">
                <h2 class="title">orderAPI - Documentación</h2>
            </div>
            <div  class="content">
                <h2 class="subitlte" >POST /orders.</h2>
                <p>Agregar en el body de la peticion JSON:</p>
                <img src="../order.png" alt="Modelo de Peticion JSON">
                <p>"price": Costo del producto.</p>
                <p>"total": Costo total del pedido.</p>
                <p>"shippingDetails": Datos del autor del pedido.</p>
                <p>"items": Array de productos hechos en el pedido.</p>
            </div>
        </body>
        </html>
    `;
    res.send(htmlResponse)
})

router.post("/",[
    check("price","Precio Obligatorio").not().isEmpty(),
    check("total","El total es obligatorio").not().isEmpty(),
    check("shippingDetails","Los datos son obligatorios").not().isEmpty(),
    check("items","Los items son obligatorios").not().isEmpty(),
    VerifyErrors
], createOrder)

export default router