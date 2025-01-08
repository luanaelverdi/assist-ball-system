import { Router } from "express";
import { authController } from "../controllers/authController";

const router: Router = Router();

/**@openapi
 * /api/auth:
 *   post: 
 *     summary: Devuelve un TOKEN de autentificación 
 *     required: true
 *     content:
 *       application/json:
 *          schema:
 *           properties:
 *              email: string
 *              contraseña: string  
 *   responses:
 *     200:
 *       description: Token
 *       content:
 *         application/json:
 *           schema:    
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: OK
 *               usuario:
 *                 type: object
 *                 properties:
 *                   id_user:
 *                     type: number
 *                   full_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   category:
 *                     type: string
 *                   user_type:
 *                     type: string
 *                   user_state:
 *                     type: string
 *                   fecha_alta_usuario:
 *                     type: string
 *                   fecha_baja_usuario:
 *                     type: string


 */
router.post('/', authController.login);

export default router;