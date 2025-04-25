import express, {Express} from "express";
import cors from "cors";
import { DBConnection } from "../db/config";
import orderRoutes from "../routes/orders"


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
        this.app.use(cors({
            origin: "https://campitoshop.vercel.app", // Permitir solicitudes desde este origen
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
            allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
            credentials: true // Permitir envío de cookies si es necesario
        }));
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