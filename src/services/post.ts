import { prismaClient } from "../lib/db"
import crypto from 'crypto';
import  jwt from 'jsonwebtoken';

const secret = 'JWT$ecr3t';

export interface CreatePostPayload {
    text: string
    postImageURL: string
    authorId: string
}

class PostService {
   
    public static createPost (payload: CreatePostPayload) {
        const {text, postImageURL, authorId} = payload;
        return prismaClient.post.create({
            data: {
                text,
                postImageURL,
                authorId
            }
        })
    }

    public static getUserPosts (authorId: string) {
        return prismaClient.post.findMany({ where: {authorId}})
    }

    public static async getUserbyid  (id: string) {
        const res =  await prismaClient.user.findFirst({where: {id}})
        return res
    }
}
export default PostService