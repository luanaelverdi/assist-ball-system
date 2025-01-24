import { Router } from "express";
import { authController } from "../controllers/authController";

const router: Router = Router();
/**
 * @openapi
 * /api/auth:
 *   post:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Auth
 *     summary: Devuelve un TOKEN de autentificacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           properties:
 *              email:
 *                  type: string
 *                  example: tomas.m@gmail.com
 *              password:
 *                  type: string
 *                  example: tomas123
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
 *                  token_user:
 *                      type: string
 */

router.post('/', authController.login);

export default router;