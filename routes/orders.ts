import {Router} from "express"

import { createOrder } from "../controllers/orders"


const router = Router ();


router.post("/{*splat}", createOrder);

export default router