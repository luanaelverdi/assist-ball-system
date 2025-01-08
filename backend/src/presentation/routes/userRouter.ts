import { Router } from "express";
import { userController } from "../controllers/userController";
import { ValidarAutorizacion } from "../../middlewares/autorizacion";

const router: Router = Router();

/**
 * @openapi
 * /api/user:
 *   post:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Usuario
 *     summary: Añade un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: number
 *                 example: 12345678
 *               full_name:
 *                 type: string
 *                 example: Juan Perez
 *               email:
 *                 type: string
 *                 example: juanperez@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *               category:
 *                 type: string
 *                 example: admin
 *               user_type:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: User creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 */
router.post('/', ValidarAutorizacion.User, userController.add);

/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Usuario
 *     summary: Devuelve un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_user:
 *                   type: number
 *                 full_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 category:
 *                   type: string
 *                 user_type:
 *                   type: string
 */
router.get('/:id', ValidarAutorizacion.User, userController.getByID);

/**
 * @openapi
 * /api/user/searchUserwithEmail/{mail}:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Usuario
 *     summary: Trae un usuario por email
 *     parameters:
 *       - in: path
 *         name: mail
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_user:
 *                   type: number
 *                 full_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 category:
 *                   type: string
 *                 user_type:
 *                   type: string
 */
router.get('/searchUserwithEmail/:mail', ValidarAutorizacion.User, userController.searchUserwithEmail);

/**
 * @openapi
 * /api/user/searchUserByType/{type}:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Usuario
 *     summary: Trae usuarios por tipo
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_user:
 *                   type: number
 *                 full_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 category:
 *                   type: string
 *                 user_type:
 *                   type: string
 */
router.get('/searchUserByType/:type', ValidarAutorizacion.User, userController.searchUserByType);

/**
 * @openapi
 * /api/user/delete/{id}:
 *   delete:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Usuario
 *     summary: Elimina un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 */
router.delete('/delete/:id', ValidarAutorizacion.User, userController.deleteUser);

// Resto del código sigue un patrón similar

export default router;
