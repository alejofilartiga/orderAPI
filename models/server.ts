import express, {Express} from "express";
import cors from "cors";
import { DBConnection } from "../db/config";
import orderRoutes from "../routes/orders"

const corsConfig = {
    origin:"*",
    credential:true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }

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
        this.app.use(cors(corsConfig))
        this.app.use(express.json());
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', 'https://campitoshop.vercel.app');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Specify allowed methods
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Specify allowed headers
            next();
          });
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