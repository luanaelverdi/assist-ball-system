 import bcrypt from 'bcrypt';

 export default class Password {
     public static readonly ROUNDS = 10;

     public static hash (password: string) {
        console.log(this.ROUNDS + "ROUNDS");
         const salt = bcrypt.genSaltSync(Password.ROUNDS);
         return bcrypt.hashSync(password, salt);
     }

     public static async validar (input: string, password: string) {
         return await bcrypt.compare(input, password);
     }
 }

