import * as jwt from "jsonwebtoken";
import User from "../models/User";

export default function createJWT (client: User) {
    return new Promise((resolve, reject) => {
        const { name, lastName, mail } = client
        const payload = { name, lastName, mail }
    }) 

}