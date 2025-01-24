import { PublicUsers } from "../database/models/User";
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

    const user = await userRepository.searchUserWithEmail(email);
    if (!user) throw new ErrorRecursoNoEncontrado("Credenciales incorrectas.");

    //if (!await Password.validar(password, user.pass_user)) throw new ErrorArgumentoInvalido("Credenciales incorrectas.");

    const usuarioPublico: PublicUsers = {
        id_user: user.id_user,
        dni_user: user.dni_user,
        fullname_user: user.fullname_user,
        email_user: user.email_user,
        category_user: user.category_user,
        type_user: user.type_user,
        state_user: user.state_user,
        fecha_alta_user: user.fecha_alta_user,
        fecha_baja_user: user.fecha_baja_user
    }

    const token = await JWT.generar(usuarioPublico);
    console.log(token + "TOKEN");
    return { user: usuarioPublico, token };
};

const obtenerRol = async (id_user: number) => {
    return await authRepository.obtenerRolPorId(id_user);
}

export const authService = {
    login,
    obtenerRol
};