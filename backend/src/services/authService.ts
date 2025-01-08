import { PublicUser } from "../database/models/User";
import { authRepository } from "../database/repository/authRepository";
import { userRepository } from "../database/repository/userRepository";
import ErrorArgumentoInvalido from "../errors/ErrorArgumentoInvalido";
import ErrorRecursoNoEncontrado from "../errors/ErrorRecursoNoEncontrado";
import JWT from "../helpers/JWT";
import Password from "../helpers/Password";

const login = async (body: { email: string, password: string }) => {
    const { email, password } = body;

    if (!email) throw new ErrorArgumentoInvalido("Debes ingresar un correo electrónico.");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) throw new ErrorArgumentoInvalido("Debes ingresar un correo electrónico válido.");
    if (!password) throw new ErrorArgumentoInvalido("Debes ingresar una contraseña.");

    const user = await userRepository.searchUserwithEmail(email);
    if (!user) throw new ErrorRecursoNoEncontrado("Credenciales incorrectas.");
    if (!await Password.validar(password, user.password)) throw new ErrorArgumentoInvalido("Credenciales incorrectas.");
    if (!await Password.validar(password,password)) throw new ErrorArgumentoInvalido("Credenciales incorrectas.");
    
    const publicUser: PublicUser = {
        id_user: user.id_user,
        dni: user.dni,
        full_name: user.full_name,
        email: user.email,
        category: user.category,
        user_type: user.user_type,
        user_state: user.user_state,
        fecha_alta_usuario: user.fecha_alta,
        fecha_baja_usuario: user.fecha_baja
    }
    const token = await JWT.generar(publicUser);
    return { user: publicUser, token };
};

const obtenerRol = async (id_user: number) => {
    return await authRepository.obtenerRolPorId(id_user);
}

export const authService = {
    login,
    obtenerRol
};