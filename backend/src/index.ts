 import express from 'express';
 import dotenv from 'dotenv';
 import Server from './Server';
 import Postgres from './database/Postgres';

 dotenv.config();

 const app = new Server();
 app.listen();

 Postgres.init();
