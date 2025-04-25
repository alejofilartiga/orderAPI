import express, {Express} from "express";
import cors from "cors";
import { DBConnection } from "../db/config";
import orderRoutes from "../routes/orders"

const corsConfig = {
    origin: "https://campitoshop.vercel.app", // Cambia '*' por el origen permitido
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true, // Asegúrate de que las credenciales estén habilitadas
    exposedHeaders: ["Content-Range", "X-Content-Range"]
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
        this.app.use(express.json());

        // Manejo de solicitudes OPTIONS
        this.app.options("*", cors(corsConfig));
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