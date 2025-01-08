import { PublicUser } from "./src/database/models/User"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_URL: string,
      POSTGRES_PORT: number,
      POSTGRES_DB_NAME: string,
      POSTGRES_USERNAME: string,
      POSTGRES_PASSWORD: string,
      JWT_KEY: string
      /*  JWT_EXPIRATION: string,*/
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      usuario: PublicUser
    }
  }
}

export { }