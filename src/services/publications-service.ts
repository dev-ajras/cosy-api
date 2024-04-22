import Publication from "../models/Publication"
import User from "../models/User";

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
        const publications = await Publication.findAll({where: {isPublic: true}, order: [["createdAt", "DESC"]]})
        const publicationsWithImageProfile = []
        for (const publication of publications){
          const user = await User.findByPk(publication.userId)
          const data: any = {}
          data.content = publication.content;
          data.image = publication.image;
          data.isPublic = publication.isPublic;
          data.profile_image = user?.profile_image;
          data.fullname = `${user?.name} ${user?.lastName}`
          publicationsWithImageProfile.push(data);
        }
        return publicationsWithImageProfile;
    }
}

