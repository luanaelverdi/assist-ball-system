import express, { Application } from "express";
import path from "path";
import userRouter from "./presentation/routes/userRouter";
import authRouter from "./presentation/routes/authRouter";
import { swaggerDocs, swaggerSpec } from "./helpers/swagger";
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import assistanceRouter from "./presentation/routes/assistanceRouter";
import notificationRouter from "./presentation/routes/notificationRouter";
import dtPlayersRouter from "./presentation/routes/dtPlayersRouter";
import pantallaRouter from "./presentation/routes/pantallaRouter";
import routeRouter from "./presentation/routes/routeRouter";


class Server {
  private app: Application;
  private port: string;
  private pathRoutes = {
    // swaggerDocs: '/api/docs',
    // rol: '/api/Rol',
    // permiso: '/api/Permiso',
    // grupoRol: '/api/GrupoRol',
    // tipoEventoCalendario: '/api/TipoEventoCalendario',
    // estado: '/api/Estado',
    // estadoProyecto: '/api/EstadoProyecto',
    // proyecto: '/api/Proyecto',
    // miembro: '/api/Miembro',
    // eventoCalendario: '/api/EventoCalendario',
    // equipo: '/api/Equipo',
    // mock: '/api/Mock',
    // auth: '/api/Auth',
    // grupoCapacitacion: '/api/GrupoCapacitacion',
    // capacitacion: '/api/Capacitacion',
    // novedad: '/api/Novedad',
    // beneficio: '/api/Beneficio',
    // grupoBeneficio: '/api/GrupoBeneficio',
    // tarjetaIncio: '/api/TarjetaInicio',
    // grupoPregunta: '/api/GrupoPregunta',
    // pregunta: '/api/Pregunta',
    // test: '/api/test',
    // pdf: '/api/Pdf',
    docs: '/docs',
    auth: '/api/auth',
    user: '/api/user',
    assistance: '/api/assistance',
    notification: '/api/notification',
    dtPlayers: '/api/dtPlayers',
    pantalla: '/api/pantalla',
    route: '/api/route'

  };

  constructor() {
    this.app = express();
    // this.port = process.env.PORT;
    this.port = "8000";

    // this.initModels();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json({ limit: 10428800 }));
     this.app.use(
       cors({
         origin:
           process.env.PRODUCTION === 'true'
             ? [process.env.FRONTEND_URL!]
             : process.env.DEV_FRONTEND_URL,
       })
     );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));


  }

  routes() {
    this.app.use(this.pathRoutes.user, userRouter);
    this.app.use(this.pathRoutes.auth, authRouter);
    this.app.use(this.pathRoutes.assistance, assistanceRouter);
    this.app.use(this.pathRoutes.notification, notificationRouter);
    this.app.use(this.pathRoutes.dtPlayers, dtPlayersRouter);
    this.app.use(this.pathRoutes.pantalla, pantallaRouter);
    this.app.use(this.pathRoutes.route, routeRouter);

    // this.app.use(this.pathRoutes.test, function (_, res) {
    //   res.json(true);
    // });
    this.app.use('/public', express.static(path.join(__dirname, '/../public')));

    this.app.use(
      this.pathRoutes.docs,
      swaggerUI.serve,
      swaggerUI.setup(swaggerSpec)
    );

    // this.app.all('*', () => {
    //   throw new NotFoundError();
    // });
    // this.app.use(errorHandler);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`🟩 | Servidor escuchando en el Puerto: ${this.port}`);
      swaggerDocs(this.app, this.port);
    });
  }
}

export default Server