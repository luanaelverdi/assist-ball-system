import { Router } from "express";
import { ValidarAutorizacion } from "../../middlewares/autorizacion";
import { assistanceController } from "../controllers/assistanceController";

const router: Router = Router();

/**
 * @openapi
 * /api/assistance/getAll:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Asistencia
 *     summary: Devuelve todas las asistencias
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
 *                       id_asistencia:
 *                         type: number
 *                       fecha_asistencia:
 *                         type: string
 *                       hora_asistencia:
 *                         type: string
 *                       id_player:
 *                         type: number
 *                       id_dt:
 *                         type: number    
 */
router.get('/getAll', ValidarAutorizacion.User, assistanceController.getAll);

/**
 * @openapi
 * /api/assistance:
 *   post:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Asistencia
 *     summary: Añade una asistencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_asistencia:
 *                 type: Date
 *                 example: 2022-01-01
 *               hora_asistencia:
 *                 type: string
 *                 example: 12:00
 *               id_player:
 *                 type: number
 *                 example: 4
 *               id_dt:
 *                 type: number 
 *                 example: 7 
 *     responses:
 *       200:
 *         description: Asistencia creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 */
router.post('/', ValidarAutorizacion.User, assistanceController.add);



/**
 * @openapi
 * /api/assistance/{id}:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Asistencia
 *     summary: Devuelve una asistencia por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la asistencia
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_asistencia:
 *                   type: number
 *                 fecha_asistencia:
 *                   type: string
 *                 hora_asistencia:
 *                   type: string
 *                 id_player:
 *                   type: number
 *                 id_dt:
 *                   type: number       
 */
router.get('/:id', ValidarAutorizacion.User, assistanceController.getByID);

/**
 * @openapi
 * /api/assistance/searchByDate/{date}:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Asistencia
 *     summary: Devuelve asistencias por fecha
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: Fecha de la asistencia
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_asistencia:
 *                   type: number
 *                 fecha_asistencia:
 *                   type: string
 *                 hora_asistencia:
 *                   type: string
 */
router.get('/searchByDate/:date', ValidarAutorizacion.User, assistanceController.getByDates);

/**
 * @openapi
 * /api/assistance/getByIdPlayer/{id}:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Asistencia
 *     summary: Devuelve id jugador segun asistencia
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del jugador
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_asistencia:
 *                   type: number
 *                 fecha_asistencia:
 *                   type: string
 *                 hora_asistencia:
 *                   type: string
 *                 id_dt:
 *                   type: number 
 */
router.get('/getByIdPlayer/:id', ValidarAutorizacion.User, assistanceController.getByID_player);

/**
 * @openapi
 * /api/assistance/getByIdDT/{id}:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - Asistencia
 *     summary: Devuelve id del dt segun asistencia
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del dt
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_asistencia:
 *                   type: number
 *                 fecha_asistencia:
 *                   type: string
 *                 hora_asistencia:
 *                   type: string
 *                 id_player:
 *                   type: number 
 */
router.get('/getByIdDT/:id', ValidarAutorizacion.User, assistanceController.getByID_dt);

export default router;