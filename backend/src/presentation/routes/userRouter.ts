import { Router } from "express";
import { userController } from "../controllers/userController";
import { ValidarAutorizacion } from "../../middlewares/autorizacion";

const router: Router = Router();

/**
 * @openapi
 * /api/user:
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
router.post('/', ValidarAutorizacion.User, userController.add);

/** 
 * @openapi
 * /api/user/{id}:
 *   get:
 *     summary: Devuelve todos los usuarios
 *     description: Devuelve todos los usuarios
 *     tags:    
 *       - Usuario
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario
 *         required: true
 *         schema:      
 *           type: number
 *     responses:
 *       200:
 *         description: Devuelve todos los usuarios 
 *         content:
 *           application/json:
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
router.get('/:id', ValidarAutorizacion.User, userController.getByID);
/**
 * @openapi
 * /api/user/search:
 *   get:
 *     summary: Devuelve todos los usuarios
 *     description: Devuelve todos los usuarios
 *     tags:
 *       - Usuario
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Busca por nombre o email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devuelve todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:     
 *  
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
router.get('/search', ValidarAutorizacion.User, userController.searchUserwithEmail);

/**
 * @openapi
 * /api/user/search/type:
 *   get:
 *     summary: Devuelve todos los usuarios
 *     description: Devuelve todos los usuarios
 *     tags:
 *       - Usuario                                                      
 *     parameters:
 *       - name: type
 *         in: query
 *         description: Busca por tipo de usuario
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devuelve todos los usuarios
 *         content:
 */
router.get('/search/type', ValidarAutorizacion.User, userController.searchUserByType);

/**
 * @openapi
 * /api/user/password:
 *   get:
 *     summary: Devuelve todos los usuarios
 *     description: Devuelve todos los usuarios
 *     tags:
 *       - Usuario
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Devuelve todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
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
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Usuario no encontrado
 */
router.get('/password', ValidarAutorizacion.User, userController.getPasswordUser);  

/**
 * @openapi
 * /api/user/delete:
 *   delete:
 *     summary: Elimina un usuario
 *     description: Elimina un usuario
 *     tags:
 *       - Usuario
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: number
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
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Usuario no encontrado
 */
router.delete('/:id', ValidarAutorizacion.User, userController.deleteUser);

/**
 * @openapi 
 * /api/user/add:
 *   post:
 *     summary: Añade un usuario
 *     description: Añade un usuario
 *     tags:
 *       - Usuario
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
 *         description: Usuario añadido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Usuario no encontrado
 */ 
router.post('/', ValidarAutorizacion.User, userController.add);

export default router;
