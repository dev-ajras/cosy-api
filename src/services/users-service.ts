import * as bcrypt from "bcrypt"
import User from "../models/User";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";



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
            name, lastName, mail, password: secretPassword})
        return {name: newUser.name, mail: newUser.mail};
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
    },
    
    getProfile: async function ({id_profile}:{id_profile: number}){
        const userProfile = await User.findOne({ where: {id: id_profile}});
        if(!userProfile){
            return null;
        }
        const { id, name, lastName, address, work, birthdate, school, genre, country, description, profile_image, background_image } = userProfile
        return {
            id,
            name,
            lastName,
            address,
            work,
            birthdate,
            school,
            genre,
            country,
            description,
            profile_image,
            background_image
        }
    },
    getAllProfiles: async function (){
        const usersProfile = await User.findAll();
        if(!usersProfile){
            return null;
        }
        const allProfiles = []
        for(const userProfile of usersProfile){
        const { name, lastName, id, profile_image } = userProfile
        allProfiles.push({
            id,
            name,
            lastName,
            profile_image
        })
    }
    return allProfiles
}
    
}