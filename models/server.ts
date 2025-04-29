import express, { Express } from "express";
import cors from "cors";
import { DBConnection } from "../db/config";
import path from "path";

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
        this.ordersPath = "/orders"; 

        this.middlewares();
        this.routes();
    }

    async conectarDB(): Promise<void> {
        try {
            await DBConnection();
            console.log("Conexión a la base de datos exitosa");
        } catch (error) {
            console.error("Error al conectar a la base de datos:", error);
            process.exit(1);
        }
    }

    middlewares(): void {
        this.app.use(cors(corsConfig));
        this.app.use(express.json());
        // Servir archivos estáticos desde la carpeta raíz del proyecto
        this.app.use(express.static(path.join(__dirname, "../")));
    }

    routes(): void {
        this.app.use(this.ordersPath, orderRoutes); 
        // Ruta para servir el archivo index.html
        this.app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "../index.html"));
        });
    }

    async listen(): Promise<void> {
        try {
            await this.conectarDB(); 
            this.app.listen(this.port, () => {
                console.log("Servidor en puerto", this.port);
            });
        } catch (error) {
            console.error("Error al iniciar el servidor:", error);
        }
    }
}