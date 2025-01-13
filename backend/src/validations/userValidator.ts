import { userRepository } from "../database/repository/userRepository";
import ErrorArgumentoInvalido from "../errors/ErrorArgumentoInvalido";

const validateName = (name: string) => {
    if (!name || name.length <= 0) throw new ErrorArgumentoInvalido("La longitud del nombre no puede ser vacía.");
};

const validatePassword = (pass: string) => {
    if (!pass || pass.length <= 8) throw new ErrorArgumentoInvalido("La longitud de la contraseña no puede ser menor a 8 dígitos.");
};

const validateEmail = (email: string) => {
    if(!email || email.length <= 0) throw new ErrorArgumentoInvalido("La longitud del email no puede ser vacía.");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) throw new ErrorArgumentoInvalido("El email es inválido.");

}

const validateType = (type: string) => {
    if (!['admin', 'dt', 'player'].includes(type)) throw new ErrorArgumentoInvalido("El tipo de usuario es inválido.");
}

const validateDNI = (dni: number) => {
    if (!dni || dni <= 0) throw new ErrorArgumentoInvalido("El dni no puede estar vacío.");
}

const validateCategory = (category: string) => {
    if (!category || category.length <= 0) throw new ErrorArgumentoInvalido("La categoria no puede estar vacía.");
}
const validarEmailRepetido = async (email: string, id: number | null) => {
    const users = await userRepository.getAll();
    
    if (id) {
        if (users.find(u =>  u.id_user != id &&
            u.email_user === email)) 
            throw new ErrorArgumentoInvalido("El email se encuentra en uso.");
    } else {
    if (users.find(u =>  u.email_user === email)) 
        throw new ErrorArgumentoInvalido("El email se encuentra en uso.");
    }
}

export const userValidator = {
    validateName,
    validatePassword,
    validateEmail,
    validateType,
    validateDNI,
    validateCategory,
    validarEmailRepetido
}