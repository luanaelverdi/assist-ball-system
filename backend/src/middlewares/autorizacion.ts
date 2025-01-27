import { Request, Response, NextFunction } from "express";
import { TypeUser } from "../database/models/User";
import JWT from "../helpers/JWT";
import { ResponseError } from "../helpers/ControllerResponse";
import { authService } from "../services/authService";
import responses from "../static/responses";
import ErrorNoAutorizado from "../errors/ErrorNoAutorizado";
import { formToJSON } from "axios";

class Autorizacion {
    private async validarAutorizacion(req: Request, res: Response, next: NextFunction, permiso: TypeUser) {
        try {
            const user = JWT.validar(req);
            await this.validarPermiso(user.id_user, permiso);
            req.usuario = user;
            next();
            console.log("req.user en autorizacion valdar auto", req.usuario);
        } catch (error: any) {
            console.error(error);
            ResponseError(res, error.statusCode || responses.UNAUTHORIZED, error);
        }
    }

    private async validarPermiso(id_usuario: number, permisoRequerido: TypeUser) {
        console.log("id_usuario en autorizacion", id_usuario);
        const permisoUsuario = await authService.obtenerRol(id_usuario);
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
            req.usuario = JWT.validar(req);
            console.log("req.user en autorizacion", req.usuario);
            console.log("req.user en user", req.usuario);
            next();
        } catch (error: any) {
            console.error(error);
            ResponseError(res, error.statusCode || responses.UNAUTHORIZED, error);
        }
    }

     Custom = (permisos: TypeUser[]) => {
         return async (req: Request, res: Response, next: NextFunction) => {
             try {
                 const usuario = JWT.validar(req);
                 const permisoUsuario = await authService.obtenerRol(usuario.id_user);
                 
                 let autorizado = false;
                 for (const permiso of permisos) {
                     autorizado = autorizado || this.calcularPermiso(permisoUsuario, permiso);
                    }
                    
                    if (!autorizado) throw new ErrorNoAutorizado("Permiso denegado: Se requiren permisos de " + permisos.join(" o "));
                    req.usuario = usuario;
                    console.log("req.user en custom", req.usuario);
                 next();
             } catch (error: any) {
                 console.error(error);
                 ResponseError(res, error.statusCode || responses.UNAUTHORIZED, error);
             }
         }
     }
}

export const ValidarAutorizacion = new Autorizacion();