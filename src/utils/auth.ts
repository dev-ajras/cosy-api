import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { RequestWithUserId, User } from "../types";


export async function verifyToken (token: string): Promise<JwtPayload|string>{
    return new Promise((resolve, reject) => {
        try{
            const decoded = jwt.verify(token, "palabra_secreta");
            resolve(decoded);
        } catch (err) {
            reject(err)
        }
    })
}


export async function authMiddleware (req: RequestWithUserId, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token){
        return res.status(401).json({ message: "Debes estar logueado"})
    }

    try {
        const user = await verifyToken(token);
        if(!user){
            return res.status(403).json({ message: "Token invalido."});
        }
        console.log(token)
        console.log(user)
        req.userId = (user as JwtPayload).userId;;
        res.locals.user = user;
        next();
    } catch (err){
        return res.status(403).json({ message: "Token invalido."})
    }
}