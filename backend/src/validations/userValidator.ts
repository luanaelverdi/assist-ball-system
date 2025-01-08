import ErrorArgumentoInvalido from "../errors/ErrorArgumentoInvalido";

const validateName = (name: string) => {
    if (!name || name.length <= 0) throw new ErrorArgumentoInvalido("Longitud de nombre mayor a 0.");
};
  
const validatePassword = (pass: string) => {
    if (!pass || pass.length <= 0) throw new ErrorArgumentoInvalido("Longitud de contraseña mayor o igual a 0.");
};

const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) throw new ErrorArgumentoInvalido("Email invalido.");
}

const validateType = (type: string) => {
    if (!['admin','dt','player'].includes(type)) throw new ErrorArgumentoInvalido("Tipo de usuario invalido.");
}

const validateDNI = (dni: number) => {
    if (!dni || dni<=0) throw new ErrorArgumentoInvalido("Longitud de DNI mayor a 0.");
}

const validateCategory = (category: string) => {
    if (!category || category.length <= 0) throw new ErrorArgumentoInvalido("Longitud de categoria mayor a 0.");
}

export const userValidator = {
    validateName,
    validatePassword,
    validateEmail,
    validateType,
    validateDNI,
    validateCategory
}