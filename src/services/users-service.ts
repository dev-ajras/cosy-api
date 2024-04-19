import * as bcrypt from "bcrypt"
import User from "../models/User";
import jwt from "jsonwebtoken";



export const userService = {

    registerUser: async function ({
        name,
        lastName,
        mail,
        password }: { 
        name: String, 
        lastName: String, 
        mail: String, 
        password: String }) {
        const secretPassword = await bcrypt.hash(password as string, 10);
        const newUser = await User.create({
            name, lastName, mail, password: secretPassword
        })
        return newUser;
    },

    loginUser: async function ({mail, 
                                password}: 
                                {mail: String, 
                                password: String}
                            ) {
        const user = await User.findOne({ where: { mail }});
        if (!user){
            return null;
        }

        const passwordOk = await bcrypt.compare(password as string, user.password);
        if (!passwordOk){
            return null;
        }

        const token = jwt.sign(
            {mail: user.mail, userId: user.id}, "palabra_secreta", { expiresIn: "8h"}
        );
        return {
            token: token,
            userId: user.id,
            username: user.name
        }
    }
}