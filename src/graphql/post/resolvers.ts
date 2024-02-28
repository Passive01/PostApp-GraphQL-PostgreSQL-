import { resolveSoa } from 'dns';
import { prismaClient } from '../../lib/db';
import PostService, { CreatePostPayload } from '../../services/post';

const mutation = {
    createPost: async (_: any, payload: CreatePostPayload, contextValue: any) => {
        if (contextValue.user){
            payload.authorId=contextValue.user.id;
            const res = await PostService.createPost(payload);
            return res;
        }
    }
}

const query = {
    getUserPosts: async (_: any, args: any, contextValue: any) => {
        if (contextValue.user){
            const userId = contextValue.user.id;
            const res = await PostService.getUserPosts(userId);
            return res;
        }
    },
}

const resolver = {
    Post: {
        user(parent: any) {
            const res = PostService.getUserbyid(parent.authorId);
            return res
        }
    }
}

export const resolvers =  {query, mutation, resolver}