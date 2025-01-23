import { Router } from "express";
import { ValidarAutorizacion } from "../../middlewares/autorizacion";
import { assistanceController } from "../controllers/assistanceController";

const router: Router = Router();

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
 */
router.get('/getAll', ValidarAutorizacion.User, assistanceController.getAll);

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

export default router;