import express, { Express } from "express";
import cors from "cors";
import { DBConnection } from "../db/config";

import orderRoutes from "../routes/orders";

const corsConfig = {
    origin: "https://campitoshop.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    exposedHeaders: ["Content-Range", "X-Content-Range"]
};

export class Server {
    app: Express;
    port: string | number | undefined;
    ordersPath: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.ordersPath = "/orders"; // Asegúrate de que esta ruta no tenga errores

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(): Promise<void> {
        await DBConnection();
    }

    middlewares(): void {
        this.app.use(cors(corsConfig));
        this.app.use(express.json());
        this.app.options("*", cors(corsConfig));
    }

    routes(): void {
        this.app.use(this.ordersPath, orderRoutes); // Verifica que `orderRoutes` esté correctamente definido
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log("Servidor en puerto", this.port);
        });
    }
}