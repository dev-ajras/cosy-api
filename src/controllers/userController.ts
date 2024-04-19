import { Request, Response } from "express";
import User from "../models/User";
import { userService } from "../services/users-service";


export async function registerUser(req: Request, res: Response){
    const { name, lastName, mail, password} = req.body;
    const data = {name, lastName, mail, password}
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
    const credentials = await userService.loginUser(data);
    if (credentials == null){
        return res.status(400).json({message: "Usuario o contraseña incorrectos. "})
    }
    res.json(credentials);
}

export async function getUsers (_: Request, res: Response){
    const users = await User.findAll();
    res.json(users);
}

export async function updateUser (req: Request, res: Response){
    const { id } = req.params;
    const { name, lastName, mail, password } = req.body;

    const user = await User.findByPk(id);
    if(!user){
        return res.status(404).json({
            error: "User not found"
        });
    }

    user.name = name;
    user.lastName = lastName;
    user.mail = mail;
    user.password = password;

    await user.save();
    res.json(user);
}

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