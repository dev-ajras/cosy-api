import Publication from "../models/Publication"


export const publicationService = {

    createPublication: async function ({
        content,
        image,
        userId,
        isPublic}: { 
        content: String, 
        image: String, 
        userId: number,
        isPublic: boolean}) {
        const newPublication = await Publication.create({content, image, userId, isPublic})
        return newPublication;
    },

    getPublications: async function (){
        return await Publication.findAll({where: {isPublic: true}})
    }
}

