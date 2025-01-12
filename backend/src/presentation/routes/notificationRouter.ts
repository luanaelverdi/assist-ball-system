import { Router } from "express";
import { ValidarAutorizacion } from "../../middlewares/autorizacion";
import { notificationController } from "../controllers/notificationController"; 

const router: Router = Router();

/**
 * @openapi
 * /api/notification:
 *   post:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Notificacion
 *     summary: Añade una notificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Notificación de prueba
 *     responses:
 *       200:
 *         description: Notificación creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 */
router.post('/', ValidarAutorizacion.User, notificationController.add);

/**
 * @openapi
 * /api/notification/{id}:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Notificacion
 *     summary: Devuelve una notificación por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_notification:
 *                   type: number
 *                 description:
 *                   type: string
 */
router.get('/:id', ValidarAutorizacion.User, notificationController.getByID);

/**
 * @openapi
 * /api/notification:
 *   get:
 *     security:
 *      - tokenAutorizacion: []
 *     tags:
 *       - Notificacion
 *     summary: Trae todos las notificaciones
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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                          id_notification:
 *                              type: number
 *                              example: 1
 *                          description:
 *                              type: string
 *                              example: hola
 
 */

router.get('/', ValidarAutorizacion.User, notificationController.getAll);

/**
 * @openapi
 * /api/notification/modify/{id}:
 *   post:
 *     security:
 *      - tokenAutorizacion: []
 *     tags:
 *       - Notificacion
 *     summary: Modificar una notificación existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: La ID de la notificación a modificar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           properties:
 *              description:
 *                  type: string
 *     responses:
 *       200:
 *         description: Notificación Modificada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string    
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                      id_notification:
 *                          type: number
 *                          example: 1
 *                      description:
 *                          type: string
 *                          example: hola  
 * 
 */

router.post('/modify/:id', ValidarAutorizacion.User, notificationController.modify);

export default router;