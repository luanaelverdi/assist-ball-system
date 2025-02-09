import { Request, Response, NextFunction } from "express";
import { TypeUser } from "../database/models/Users";
import JWT from "../helpers/JWT";
import { ResponseError } from "../helpers/ControllerResponse";
import { authService } from "../services/authService";
import responses from "../static/responses";
import ErrorNoAutorizado from "../errors/ErrorNoAutorizado";

class Autorizacion {
    private async validarAutorizacion(req: Request, res: Response, next: NextFunction, permiso: TypeUser) {
        try {
            const user = JWT.validar(req);
            await this.validarPermiso(user.id_user, permiso);
            req.user = user;
            next();
        } catch (error: any) {
            console.error(error);
            ResponseError(res, error.statusCode || responses.UNAUTHORIZED, error);
        }
    }

    private async validarPermiso(id: number, permisoRequerido: TypeUser) {
        const permisoUsuario = await authService.obtenerRol(id);
        const poseePermiso = this.calcularPermiso(permisoUsuario, permisoRequerido);

        if (!poseePermiso) {
            throw new ErrorNoAutorizado("Permiso denegado: Se requiren permisos de " + permisoRequerido);
        }
    }

    private calcularPermiso(permisoUsuario: TypeUser, permisoRequerido: TypeUser) {
        return permisoUsuario === 'admin' || permisoUsuario === permisoRequerido;
    }

    Admin = (req: Request, res: Response, next: NextFunction) => {
        this.validarAutorizacion(req, res, next, 'admin');
    }

    Dt = (req: Request, res: Response, next: NextFunction) => {
        this.validarAutorizacion(req, res, next, 'dt');
    }

    Player = (req: Request, res: Response, next: NextFunction) => {
        this.validarAutorizacion(req, res, next, 'player');
    }


    User = async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.user = JWT.validar(req);
            next();
        } catch (error: any) {
            console.error(error);
            ResponseError(res, error.statusCode || responses.UNAUTHORIZED, error);
        }
    }

    Custom = (permisos: TypeUser[]) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            console.log("Middleware ejecutado - req.url:", req.url);
            console.log("Middleware ejecutado - req.originalUrl:", req.originalUrl);
            console.log("Middleware ejecutado - req.params:", req.params);

            try {
                const usuario = JWT.validar(req);
                const permisoUsuario = await authService.obtenerRol(usuario.id_user);
                let autorizado = false;
                for (const permiso of permisos) {
                    autorizado = autorizado || this.calcularPermiso(permisoUsuario, permiso);
                }

                if (!autorizado) throw new ErrorNoAutorizado("Permiso denegado: Se requiren permisos de " + permisos.join(" o "));
                req.user = usuario;
                next();
            } catch (error: any) {
                console.error(error);
                ResponseError(res, error.statusCode || responses.UNAUTHORIZED, error);
            }
        }
    }
}

export const ValidarAutorizacion = new Autorizacion();