import swaggerJSDoc from 'swagger-jsdoc';
import { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AssistBall System API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        tokenAutorizacion: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  servers: [
    {
      url: "localhost:8000",
      description: 'Development server',
    },
  ],
  apis: ['./src/presentation/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = (app: Application, port: string) => {
  app.get('/docs', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(
    `🟩 | Documentación API v1.0.0 en http://localhost:${port}/docs`
  );
};
