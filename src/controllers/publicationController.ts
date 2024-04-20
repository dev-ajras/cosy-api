import { Request, Response } from "express";
import { publicationService } from "../services/publications-service";
import { RequestWithUserId } from "../types";

export async function createPublication (req: RequestWithUserId, res: Response){
    const {content, image, isPublic} = req.body;
    const userId= req.userId!
    const data = {content, image, userId, isPublic};
    try {
        await publicationService.createPublication(data);
        return res.status(201).json({message: "Publicacion creada exitosamente!"})
    }catch (err){
        console.log(err);
        return res.status(400).json({message: "Error al intentar crear la publicacion, intente en unos minutos por favor."})
    }
}


export async function getPublications (req: RequestWithUserId, res: Response){
    try{
        const publications = await publicationService.getPublications();
        return res.status(200).json(publications);
    }catch (err){
        return res.status(500).json({message: "Ocurrio un error inesperado, por favor intente en unos minutos."})
    }
}