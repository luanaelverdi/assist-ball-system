import jwt from 'jsonwebtoken';
import { Users, PublicUsers } from "../database/models/User";
import { Request } from 'express';
import ErrorNoAutorizado from '../errors/ErrorNoAutorizado';

export default class JWT {
    private static readonly EXPIRATION = '24h';

    // Generar un token JWT
    public static generar(user: PublicUsers): Promise<string> {
        if (!process.env.JWT_KEY) {
            throw new Error('La clave secreta JWT no está configurada.');
        }
        const payload = { user };
        return new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: this.EXPIRATION }, (err, token) => {
                if (err) {
                    return reject('No se pudo generar el token.');
                }
                resolve(token!);
            });
        });
    }

    // Validar un token desde la cabecera de la solicitud
    public static validar(req: Request): PublicUsers {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                throw new ErrorNoAutorizado('Token no enviado.');
            }
    
            const parts = authHeader.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                throw new ErrorNoAutorizado('Formato de token no válido.');
            }
    
            const token = parts[1];
            const user = this.verificarToken(token);
    
            console.log("Usuario decodificado en validar:", user); // Depuración válida
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Verificar el token JWT
    public static verificarToken(token: string): PublicUsers {
        try {
            if (!process.env.JWT_KEY) {
                throw new Error('La clave secreta JWT no está configurada.');
            }

            const { user } = jwt.verify(token, process.env.JWT_KEY!) as any;
            return user;
        } catch (error) {
            throw new ErrorNoAutorizado('Token inválido.');
        }
    }
}
