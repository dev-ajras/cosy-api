import { Request } from "express";
export interface RequestWithUserId extends Request {
    userId?: number;
}
export interface User{
    id: number;
}