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
            name, lastName, mail, password: secretPassword, profile_image: "/images/user.png",
            background_image: "/images/background.jpg"
        })
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
    
    getProfile: async function ({id}:{id: number}){
        const userProfile = await User.findOne({ where: {id: id}});
        if(!userProfile){
            return null;
        }
        const { name, lastName, address, work, birthdate, school, genre, country, description, profile_image, background_image } = userProfile
        return {
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

    saveProfileImage: async function (image: any, id: number) {
        const folderPath = `/usr/src/app/images/${id}`;
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

        const isValidImageType = function (mimetype: string) {
            return allowedImageTypes.includes(mimetype);
        };
        if (!isValidImageType(image.mimetype)) {
            return null;
        }
        const type = image.mimetype.split("/")[1];
        const nameLocal = `/images/${id}/profile_picture.${type}`
        const imagePath = path.join(folderPath, `profile_picture.${type}`);
    
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
    
        fs.renameSync(image.path, imagePath);
    
        return nameLocal;
    },

    saveBackgroundImage: async function (image: any, id: number) {
        const folderPath = `/usr/src/app/images/${id}`;
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

        const isValidImageType = function (mimetype: string) {
            return allowedImageTypes.includes(mimetype);
        };
        if (!isValidImageType(image.mimetype)) {
            return null;
        }
        const type = image.mimetype.split("/")[1];
        const nameLocal = `/images/${id}/background_picture.${type}`
        const imagePath = path.join(folderPath, `background_picture.${type}`);
    
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
    
        fs.renameSync(image.path, imagePath);
    
        return nameLocal;
    }
    
}