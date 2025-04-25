import { Request, Response } from "express";
import Order, { IOrder } from "../models/orders";

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const orderData: IOrder = req.body;

    const data = {
        ...orderData,
        createdAt: new Date(),
        status: "pending"
    };

    const order = new Order(data);

    await order.save(); // Asegúrate de usar `await` para guardar correctamente en la base de datos

    res.status(201).json("Orden Confirmada");
};