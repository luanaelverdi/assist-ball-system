import express from 'express';
import dotenv from 'dotenv';
import Server from './Server';
import Postgres from './database/Postgres';

dotenv.config();

const app = new Server();
app.listen();

Postgres.init().then(async () => {
    // await Parametros.Iniciar();
    //await Parametros.Actualizar();
    // await Helpers.Execute();
    //await Scheduler.iniciar();
}).catch((err) => console.error(err));