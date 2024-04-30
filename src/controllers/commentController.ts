import { RequestWithUserId } from "../types";
import { commentService } from "../services/comments-service";
import { Response } from "express";


export async function createComment (req: RequestWithUserId, res: Response){
    const {content, image, publicationId} = req.body;
    const userId= req.userId!
    const data = {content, image, userId, publicationId };
    try {
        await commentService.createComment(data);
        return res.status(201).json({message: "Comentario creado exitosamente!"})
    }catch (err){
        console.log(err);
        return res.status(400).json({message: "Error al intentar enviar el comentario, intente en unos minutos por favor."})
    }
}