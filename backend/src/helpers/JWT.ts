import jwt from 'jsonwebtoken';
import { User, PublicUser } from "../database/models/User";
import { Request } from 'express';
import ErrorNoAutorizado from '../errors/ErrorNoAutorizado';

export default class JWT {
    public static generar (user: PublicUser) {
        return new Promise((resolve, reject) => {
            const payload = { user };
            jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' }, (err, token) => {
                if (err) reject('No se pudo generar el token.');
                resolve(token);
            });
        });
    }

    public static validar (req: Request) {
        try {
            const token = req.headers['authorization']?.split(" ");
            if (!token) throw new ErrorNoAutorizado("Token no enviado.");
            return this.verificarToken(token[1]);
        } catch (error) {
            throw error;
        }
    }

    public static verificarToken (token: string): PublicUser {
        try {
            const { user } = jwt.verify(token, process.env.JWT_KEY) as any;
            return user;
        } catch (error) {
            throw new ErrorNoAutorizado("Token inválido.");
        }
    }
}