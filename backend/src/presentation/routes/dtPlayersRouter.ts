import { Router } from "express";
import { ValidarAutorizacion } from "../../middlewares/autorizacion";
import { dtPlayersController } from "../controllers/dtPlayersController"; 

const router: Router = Router();
/**
 * @openapi
 * /api/dtPlayers/getAll:
 *   get:
 *     security:
 *      - tokenAutorizacion: []
 *     tags:
 *       - DtPlayers
 *     summary: Devuelve todas las relaciones dt-player
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
 *                          id_dt_players:
 *                              type: number
 *                              example: 1
 *                          id_dt:
 *                              type: number
 *                              example: 1
 *                          id_player:
 *                              type: number
 *                              example: 1
 
 */

router.get('/getAll', ValidarAutorizacion.User, dtPlayersController.getAll);

/**
 * @openapi
 * /api/dtPlayers:
 *   post:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - DtPlayers
 *     summary: Añade una relacion dt-player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:    
 *             type: object
 *             properties:
 *               id_dt:
 *                 type: number
 *                 example: 1
 *               id_player:
 *                 type: number
 *                 example: 1
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
router.post('/', ValidarAutorizacion.User, dtPlayersController.addDtPlayers);



/**
 * @openapi
 * /api/dtPlayers/modify/{id}:
 *   post:
 *     security:
 *      - tokenAutorizacion: []
 *     tags:
 *       - DtPlayers
 *     summary: Modifica una relacion dt-player existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: La ID de la relacion dt-player a modificar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           properties:
 *              id_dt:
 *                  type: number
 *              id_player:
 *                  type: number
 *     responses:
 *       200:
 *         description: Asistencia Modificada
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
 *                      id_dt_players:
 *                          type: number
 *                          example: 1
 *                      id_dt:
 *                          type: number
 *                          example: 1
 *                      id_player:
 *                          type: number
 *                          example: 1
 * 
 */

router.post('/modify/:id', ValidarAutorizacion.User, dtPlayersController.modifyDtPlayers);

/**
 * @openapi
 * /api/dtPlayers/{id}:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - DtPlayers
 *     summary: Devuelve una relacion dt-player por ID
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
 *                 id_dt_players:
 *                   type: number
 *                 id_dt:
 *                   type: number
 *                 id_player:
 *                   type: number
 */
router.get('/:id', ValidarAutorizacion.User, dtPlayersController.getByID);
/**
 * @openapi
 * /api/dtPlayers/getPlayersByIdDt/{id_dt}:
 *   get:
 *     security:
 *       - tokenAutorizacion: []
 *     tags:
 *       - DtPlayers
 *     summary: Devuelve todos los jugadores de un dt
 *     parameters:
 *       - in: path
 *         name: id_dt
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del dt
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
 *                          id_player:
 *                              type: number
 *                              example: 1
 */
router.get('/getPlayersByIdDt/:id_dt', ValidarAutorizacion.Dt, dtPlayersController.getPlayersByIdDt);

export default router;