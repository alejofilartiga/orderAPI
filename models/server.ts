import express, {Express} from "express";
import { DBConnection } from "../db/config";
import orderRoutes from "../routes/orders"
import cors from "cors"


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
            origin: "*", // Permitir solicitudes desde cualquier origen
            methods: ["POST"], // Métodos permitidos
            credentials: false // Deshabilitar envío de cookies
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