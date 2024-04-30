import Comment from "../models/Comment"
import User from "../models/User"

export const commentService = {
    createComment: async function ({ content, image, userId, publicationId }: { content: string, image: string, userId: number, publicationId: number }) {
        const newComment = await Comment.create({ content, image, userId, publicationId })
        return newComment
    },
    getComment: async function ({
        id
    }: { id: number }) {
        const comment = await Comment.findByPk(id)
        const user = await User.findByPk(comment?.userId)
        return {
            content: comment?.content,
            image: comment?.image,
            fullName: `${user?.name} ${user?.lastName}`,
            user_profile_image: user?.profile_image
        }
    }
}
