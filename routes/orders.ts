import { Router } from "express";
import { createOrder } from "../controllers/orders";
import { pathToRegexp } from "path-to-regexp";

const router = Router();

// Define una ruta dinámica como ejemplo
const dynamicRoute = pathToRegexp("/orders/:id");

// Ruta para crear una orden
router.post("/", createOrder);

// Ruta dinámica de ejemplo (puedes reemplazarla con tu lógica)
router.get(dynamicRoute, (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Ruta dinámica con ID: ${id}` });
});

export default router;