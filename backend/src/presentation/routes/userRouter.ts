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
 *               dni_user:
 *                 type: number
 *                 example: 12345678
 *               fullname_user:
 *                 type: string
 *                 example: Juan Perez
 *               email_user:
 *                 type: string
 *                 example: juanperez@gmail.com
 *               pass_user:
 *                 type: string
 *                 example: 12345678
 *               category_user:
 *                 type: string
 *                 example: admin
 *               type_user:
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
router.post('/', userController.add);

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
 *                 fullname_user:
 *                   type: string
 *                 email_user:
 *                   type: string
 *                 category_user:
 *                   type: string
 *                 type_user:
 *                   type: string
 */
router.get('/:id', ValidarAutorizacion.User, userController.getByID);

/**
 * @openapi
 * /api/user/searchUserWithEmail/{mail}:
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
 *                 fullname_user:
 *                   type: string
 *                 email_user:
 *                   type: string
 *                 category_user:
 *                   type: string
 *                 type_user:
 *                   type: string
 */
router.get('/searchUserWithEmail/:mail', ValidarAutorizacion.User, userController.searchUserWithEmail);

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
 *           type_user: string
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
 *                 fullname_user:
 *                   type: string
 *                 email_user:
 *                   type: string
 *                 category_user:
 *                   type: string
 *                 type_user:
 *                   type: string
 */
router.get('/searchUserByType/:type', ValidarAutorizacion.User, userController.searchUserByType);

/**
 * @openapi
 * /api/user/delete/{id}:
 *   post:
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
router.post('/delete/:id', ValidarAutorizacion.User, userController.deleteUser);

/**
* @openapi
* /api/user/modify/{id}:
*   post:
*     security:
*      - tokenAutorizacion: []
*     tags:
 *       - Usuario
*     summary: Modificar un usuario existente. Solo para administradores.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: number
*         description: La ID del usuario a modificar.
*     requestBody:
*       required: true
*       content:
*         application/json:
*          schema:
*           properties:
*              fullname_user:
*                  type: string
*              pass_user:
*                  type: string
*              email_user:
*                  type: string
*              type_user:
*                  type: string
*              dni_user:
*                  type: number
*              category_user:
*                  type: string
*     responses:
*       200:
*         description: Usuario Modifiado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: OK
*/

router.post('/modify/:id', ValidarAutorizacion.User, userController.modify);

export default router;
