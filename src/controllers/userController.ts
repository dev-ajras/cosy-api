import { Request, Response } from "express";
import User from "../models/User";
import { userService } from "../services/users-service";
import { RequestWithUserId } from "../types";


export async function registerUser(req: Request, res: Response){
    
    const { name, lastName, mail, password} = req.body;
    const data = {name, lastName, mail, password}
    if (!name || !lastName || !mail || !password){
        return res.status(400).json({message: "Hay campos incompletos en la solicitud."})
    }
    try {
    const newUser = await userService.registerUser(data)
    res.status(201).json(newUser);
    } catch{
        res.status(400).json({message: "No se pudo registrar el usuario."})
    }
    
}

export async function loginUser(req: Request, res: Response){

    const { mail, password } = req.body;
    const data = { mail, password};
    if (!mail || !password){
        return res.status(400).json({message: "Ingrese su usuario y contraseña para acceder."});
    }
    const credentials = await userService.loginUser(data);
    if (credentials == null){
        return res.status(400).json({message: "Usuario o contraseña incorrectos. "})
    }
    res.json(credentials);
}

export async function getProfile(req: RequestWithUserId, res: Response){

    const userId = req.userId!;
    const profile = await userService.getProfile({id: userId})
    if (profile === null){
        return res.status(404).json({message: "No se encontro un perfil del usuario solicitado"});
    }
    res.json(profile);
}

export async function getExternalProfile(req: RequestWithUserId, res: Response){

    const { profileId } = req.body
    const profile = await userService.getProfile({id: profileId})
    if (profile === null){
        return res.status(404).json({message: "No se encontro un perfil del usuario solicitado"});
    }
    res.json(profile);
}


export async function getAllProfiles(req: RequestWithUserId, res: Response){

    const profile = await userService.getAllProfiles()
    if (profile === null){
        return res.status(404).json({message: "No se encontraron perfiles"});
    }
    res.json(profile);
}

export async function updateProfile( req: RequestWithUserId, res: Response){

    const userId = req.userId!;
    const profile = await User.findByPk(userId);
    const { name, lastName, address, work, birthdate, school, genre, country, description, profile_image, background_image } = req.body
    if(!profile){
        return res.status(404).json({
            message: "Profile not found"
        })
    }
    profile.name = name;
    profile.lastName = lastName;
    profile.address = address;
    profile.work = work;
    profile.birthdate = birthdate;
    profile.school = school;
    profile.genre = genre;
    profile.country = country;
    profile.description = description;
    profile.profile_image = profile_image;
    profile.background_image = background_image;
    await profile.save();
    res.json(profile);

}


// ejemplo
export async function deleteUser (req: Request, res: Response){
    const { id } = req.params;
    const user = await User.findByPk(id);

    if(!user) {
        return res.status(404).json({ error: "User not found."})
    }

    await user.destroy();
    res.json({
        message: "User deleted successfully"
    });
}