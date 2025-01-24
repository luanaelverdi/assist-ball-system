import { Router } from "express";
import { ValidarAutorizacion } from "../../middlewares/autorizacion";
import { routeController } from "../controllers/routeController";

const router: Router = Router();

router.get('/driving/:coords', routeController.obtenerRuta);

export default router;