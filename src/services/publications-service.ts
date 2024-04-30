import Publication from "../models/Publication"
import User from "../models/User";
import Comment from "../models/Comment";
import { commentService } from "./comments-service";

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
          const data: any = {}
          data.comments = []
          const allComments = await Comment.findAll({where: {publicationId: publication.id} })
            for(const comment of allComments){
                const comm = await commentService.getComment({id: comment.id})
                data.comments.push(comm)
            }
          const user = await User.findByPk(publication.userId)
          data.id = publication.id
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

