import { Router } from "express";
import { pantallaController } from "../controllers/pantallaController";

const router: Router = Router();

router.get('/', pantallaController.buscarPorTipo);

export default router;