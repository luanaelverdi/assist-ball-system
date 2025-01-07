import bcrypt from 'bcrypt';

export default class Password {
    public static readonly ROUNDS = 10;

    public static hash (password: string) {
        const salt = bcrypt.genSaltSync(Password.ROUNDS, 'a');
        return bcrypt.hashSync(password, salt);
    }

    public static async validar (input: string, password: string) {
        return await bcrypt.compare(input, password);
    }
}