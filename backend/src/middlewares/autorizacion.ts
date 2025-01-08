// import { Request, Response, NextFunction } from "express";
// import { UserType } from "../database/models/User";
// import JWT from "../helpers/JWT";
// import { ResponseError } from "../helpers/ControllerResponse";
// import { authService } from "../services/authService";
// import responses from "../static/responses";
// import ErrorNoAutorizado from "../errors/ErrorNoAutorizado";

// class Autorizacion {
//     private async validarAutorizacion (req: Request, res: Response, next: NextFunction, permiso: UserType) {
//         try {
//             const user = JWT.validar(req);
//             await this.validarPermiso(user.id_user, permiso);
//             req.user = user;
//             next();
//         } catch (error: any) {
//             console.error(error);
//             ResponseError(res, error.statusCode || responses.UNAUTHORIZED, error);
//         }
//     }

//     private async validarPermiso (id_user: number, permisoRequerido: UserType) {
//         const permisoUsuario = await authService.obtenerRol(id_user);
//         const poseePermiso = this.calcularPermiso(permisoUsuario, permisoRequerido);

//         if (!poseePermiso) {
//             throw new ErrorNoAutorizado("Permiso denegado: Se requiren permisos de "+permisoRequerido);
//         }
//     }

//     private calcularPermiso (permisoUsuario: UserType, permisoRequerido: UserType) {
//         return permisoUsuario === 'admin' || permisoUsuario === permisoRequerido;
//     }

//     Admin = (req: Request, res: Response, next: NextFunction) => {
//         this.validarAutorizacion(req, res, next, 'admin');
//     }

//     Dt = (req: Request, res: Response, next: NextFunction) => {
//         this.validarAutorizacion(req, res, next, 'dt');
//     }

//     Player = (req: Request, res: Response, next: NextFunction) => {
//         this.validarAutorizacion(req, res, next, 'player');
//     }

//     User = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             req.user = JWT.validar(req);
//             next();
//         } catch (error: any) {
//             console.error(error);
//             ResponseError(res, error.statusCode || responses.UNAUTHORIZED, error);
//         }
//     }

//     Custom = (permisos: UserType[]) => {
//         return async (req: Request, res: Response, next: NextFunction) => {
//             try {
//                 const user = JWT.validar(req);
//                 const permisoUsuario = await authService.obtenerRol(user.id_user);
                
//                 let autorizado = false;
//                 for (const permiso of permisos) {
//                     autorizado = autorizado || this.calcularPermiso(permisoUsuario, permiso);
//                 }

//                 if (!autorizado) throw new ErrorNoAutorizado("Permiso denegado: Se requiren permisos de "+ permisos.join(" o "));
//                 req.user = user;
//                 next();
//             } catch (error: any) {
//                 console.error(error);
//                 ResponseError(res, error.statusCode || responses.UNAUTHORIZED, error);
//             }
//         }
//     }
// }

// export const ValidarAutorizacion = new Autorizacion();

import { Request, Response, NextFunction } from "express";
import { UserType } from "../database/models/User";
import JWT from "../helpers/JWT";
import { ResponseError } from "../helpers/ControllerResponse";
import { authService } from "../services/authService";
import responses from "../static/responses";
import ErrorNoAutorizado from "../errors/ErrorNoAutorizado";

class Autorizacion {
    private async manejarAutorizacion(
      req: Request,
      res: Response,
      next: NextFunction,
      action: () => Promise<void>
    ) {
        try {
            await action();
            next();
        } catch (error: any) {
            console.error(error);
            ResponseError(res, error.statusCode || responses.UNAUTHORIZED, error);
        }
    }

    private async validarPermiso(id_user: number, permisoRequerido: UserType) {
        const permisoUsuario = await authService.obtenerRol(id_user);
        const poseePermiso = this.calcularPermiso(permisoUsuario, permisoRequerido);

        if (!poseePermiso) {
            throw new ErrorNoAutorizado(`Permiso denegado: Se requieren permisos de ${permisoRequerido}`);
        }
    }

    private calcularPermiso(permisoUsuario: UserType, permisoRequerido: UserType) {
        return permisoUsuario === 'admin' || permisoUsuario === permisoRequerido;
    }

    Admin = (req: Request, res: Response, next: NextFunction) => {
        this.manejarAutorizacion(req, res, next, async () => {
            const user = JWT.validar(req);
            await this.validarPermiso(user.id_user, 'admin');
            req.user = user;
        });
    }

    Dt = (req: Request, res: Response, next: NextFunction) => {
        this.manejarAutorizacion(req, res, next, async () => {
            const user = JWT.validar(req);
            await this.validarPermiso(user.id_user, 'dt');
            req.user = user;
        });
    }

    Player = (req: Request, res: Response, next: NextFunction) => {
        this.manejarAutorizacion(req, res, next, async () => {
            const user = JWT.validar(req);
            await this.validarPermiso(user.id_user, 'player');
            req.user = user;
        });
    }

    User = (req: Request, res: Response, next: NextFunction) => {
        this.manejarAutorizacion(req, res, next, async () => {
            req.user = JWT.validar(req);
        });
    }

    Custom = (permisos: UserType[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            this.manejarAutorizacion(req, res, next, async () => {
                const user = JWT.validar(req);
                const permisoUsuario = await authService.obtenerRol(user.id_user);

                const autorizado = permisos.some(permiso => 
                  this.calcularPermiso(permisoUsuario, permiso)
                );

                if (!autorizado) {
                    throw new ErrorNoAutorizado(`Permiso denegado: Se requieren permisos de ${permisos.join(" o ")}`);
                }

                req.user = user;
            });
        };
    }
}

export const ValidarAutorizacion = new Autorizacion();
