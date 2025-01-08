import jwt from 'jsonwebtoken';
import { Users, PublicUsers } from "../database/models/User";
import { Request } from 'express';
import ErrorNoAutorizado from '../errors/ErrorNoAutorizado';

export default class JWT {
    public static generar(user: PublicUsers): string {
        try {
            const payload = { user };
            const token = jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: '24h' });
            return token;
        } catch (error) {
            throw new Error("No se pudo generar el token.");
        }
    }
    

    public static validar(req: Request): PublicUsers {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ErrorNoAutorizado("Token no enviado o formato incorrecto.");
        }
    
        const token = authHeader.split(" ")[1]; // Extrae el token después de 'Bearer '
        return this.verificarToken(token);
    }
    

    public static verificarToken(token: string): PublicUsers {
        if (!process.env.JWT_KEY) {
            throw new Error("Clave JWT no configurada.");
        }
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY) as { user: PublicUsers };
            return decoded.user;
        } catch (error) {
            throw new ErrorNoAutorizado("Token inválido o expirado.");
        }
    }
    
}