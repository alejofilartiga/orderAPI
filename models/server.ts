import express, {Express} from "express";
import cors from "cors";
import { DBConnection } from "../db/config";
import orderRoutes from "../routes/orders"

const corsConfig = {
    origin: "https://campitoshop.vercel.app", // Permitir solicitudes desde este origen específico
    credentials: true, // Permitir envío de cookies si es necesario
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};

export class Server {
    app: Express
    port: string | number | undefined
    ordersPath: string

    constructor () {
        this.app = express()
        this.port = process.env.PORT
        this.ordersPath = "/orders"

        this.conectarDB()
        this.middlewares()
        this.routes()
    }

    async conectarDB() : Promise <void> {
        await DBConnection()
    }

    middlewares(): void {
        this.app.use(cors(corsConfig));

        // Asegúrate de manejar las solicitudes preflight (OPTIONS)
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "https://campitoshop.vercel.app");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            if (req.method === "OPTIONS") {
                return res.sendStatus(204); // Respuesta exitosa para preflight
            }
            next();
        });

        this.app.use(express.json());
    }

    routes():void{
        this.app.use(this.ordersPath, orderRoutes)
    }

    listen () : void {
        this.app.listen(this.port,()=>{
            console.log("Servidor en puerto", this.port)
        })
    }
}