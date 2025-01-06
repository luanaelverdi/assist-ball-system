import express from 'express';
import dotenv from 'dotenv';
import Server from './Server';

dotenv.config();

const app = new Server();
app.listen();