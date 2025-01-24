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
 *               password_user:
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
 * /api/user/getAll:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Usuario
 *     summary: Devuelve todos los usuarios
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_user:
 *                         type: number
 *                       fullname_user:
 *                         type: string
 *                       email_user:
 *                         type: string
 *                       category_user:
 *                         type: string
 *                       type_user:     
 *                         type: string
 *                       state_user:
 *                         type: string
 *                       fecha_alta_user:
 *                         type: string
 *                       fecha_baja_user:    
 *                         type: string
 */
router.get('/getAll', ValidarAutorizacion.User, userController.getAll);

/**
 * @openapi
 * /api/user/{id_user}:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Usuario
 *     summary: Devuelve un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id_user
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
router.get('/:id_user', ValidarAutorizacion.User, userController.getByID);


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
 * /api/user/searchUserByDNI/{dni}:
*   get:
*     security:
*      - tokenAutorizacion: []
*     tags:
*       - Usuario
*     summary: Trae un usuario por dni
*     parameters:
*       - in: path
*         name: dni
*         required: true
*         schema:
*           type: number
*         description: DNI del usuario
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
router.get('/searchUserByDNI/:dni', ValidarAutorizacion.User, userController.searchUserByDNI);

/**
 * @openapi
 * /api/user/getPasswordUser/{id}:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Usuario
 *     summary: Devuelve el password del usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pass_user:
 *                   type: string
 */
router.get('/getPasswordUser/:id', ValidarAutorizacion.User, userController.getPasswordUser);

/**
 * @openapi
 * /api/user/getDatosWithToken:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Usuario
 *     summary: Devuelve el usuario con sus datos
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 user:
 *                   type: object
 *                   properties:
 *                     id_user:
 *                       type: number
 *                     fullname_user:
 *                       type: string
 *                     email_user:
 *                       type: string
 *                     type_user:
 *                       type: string
 *                     category_user:
 *                       type: string
 *                 token_user:      
 *                   type: string 
 *        
 */
router.get('/getDatosWithToken', ValidarAutorizacion.User, userController.getDatosWithToken);

/**
* @openapi
* /api/user/modify/{id}:
*   post:
*     security:
*      - tokenAutorizacion: []
*     tags:
 *       - Usuario
*     summary: Modificar un usuario existente
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

/**
* @openapi
* /api/user/modifyDNI:
*   post:
*     security:
*      - tokenAutorizacion: []
*     tags:
*       - Usuario
*     summary: Modificar el dni de un usuario existente
*     requestBody:
*       required: true
*       content:
*         application/json: 
*           schema:
*             type: object
*             properties:
*               dni:
*                 type: number
*     responses:
*       200:
*         description: Usuario Modificado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: OK
*/
router.post('/modifyDNI', ValidarAutorizacion.User, userController.modifyDNI);

/**
 * @openapi
 * /api/user/modifyName:
*   post:
*     security:
*      - tokenAutorizacion: []
*     tags:
*       - Usuario
*     summary: Modificar el nombre de un usuario existente
*     requestBody:
*       required: true
*       content:
*         application/json: 
*           schema:
*             type: object
*             properties:
*               nombre:
*                 type: string
*     responses:
*       200:
*         description: Usuario Modificado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: OK
*/
router.post('/modifyName', ValidarAutorizacion.User, userController.modifyName);

/**
 * @openapi
 * /api/user/modifyPassword:
*   post:
*     security:
*      - tokenAutorizacion: []
*     tags:
*       - Usuario
*     summary: Modificar el password de un usuario existente
*     requestBody:
*       required: true
*       content:
*         application/json: 
*           schema:
*             type: object
*             properties:
*               pass:
*                 type: string
*     responses:
*       200:
*         description: Usuario Modificado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: OK
*/
router.post('/modifyPassword', ValidarAutorizacion.User, userController.modifyPassword);

/**
 * @openapi
 * /api/user/modifyEmail:
*   post:
*     security:
*      - tokenAutorizacion: []
*     tags:
*       - Usuario
*     summary: Modificar el email de un usuario existente
*     requestBody:
*       required: true
*       content:
*         application/json: 
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*     responses:
*       200:
*         description: Usuario Modificado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                   example: OK
*/
router.post('/modifyEmail', ValidarAutorizacion.User, userController.modifyEmail);

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



export default router;
