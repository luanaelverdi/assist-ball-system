import { Router } from "express";
import { authController } from "../controllers/authController";

const router: Router = Router();

/**
 * @openapi
 * /api/auth:
 *   post:
 *     tags: [Login]
 *     summary: Devuelve un TOKEN de autentificacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           properties:
 *              email:
 *                  type: string
 *                  example: guido@gmail.com
 *              password:
 *                  type: string
 *                  example: 1230
 *     responses:
 *       200:
 *         description: Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status:
 *                      type: string
 *                      example: OK
 *                  user:
 *                      type: object
 *                      properties:
 *                          id_user:
 *                              type: number
 *                          fullname_user:
 *                              type: string
 *                          email_user:
 *                              type: string
 *                          type_user:
 *                              type: string
 *                          category_user:
 *                              type: string
 *                  token:
 *                      type: string   
 */

router.post('/', authController.login);

export default router;