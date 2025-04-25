import { Request, Response } from "express";
import Order, { IOrder } from "../models/orders";

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderData: IOrder = req.body;

        const data = {
            ...orderData,
            createdAt: new Date(),
            status: "pending",
        };

        const order = new Order(data);
        await order.save();

        res.status(201).json("Orden Confirmada");
    } catch (error) {
        console.error("Error al crear la orden:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};