//import { UsuarioPublico } from "./src/database/models/Usuario"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_URL: string,
      POSTGRES_PORT: number,
      POSTGRES_DB_NAME: string,
      POSTGRES_USERNAME: string,
      POSTGRES_PASSWORD: string,
      JWT_KEY: string,
      FRONTEND_URL: string,
      TRACCAR_URL : string
    }
  }
}

/*declare global {
  namespace Express {
      interface Request {
          usuario: UsuarioPublico
      }
  }
}*/

export {}