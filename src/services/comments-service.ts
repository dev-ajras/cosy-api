import Comment from "../models/Comment"

export const commentService = {
    createComment: async function ({ content, image, userId, publicationId }: { content: string, image: string, userId: number, publicationId: number }) {
       const newComment = await Comment.create({content, image, userId, publicationId})
       return newComment
    }
}
