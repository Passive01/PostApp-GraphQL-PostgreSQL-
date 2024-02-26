import { prismaClient } from '../../lib/db';
import UserService, { CreateJWTPayload, CreateUserPayload } from '../../services/user';

const mutation = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }
      
}

const query = {
    createJwt: async (_: any, payload: CreateJWTPayload) => {
        const token = await UserService.createJwt(payload);
        return token;
    },

    getCurrentUser: async (parent: any, args: any, contextValue: any, info: any)=> {
        if (contextValue && contextValue.user) {
            const id = contextValue.user.id
            const user = UserService.getUserById(id)
            return user
        }
        throw new Error ("Invalid User")
    }
}

export const resolvers =  {query, mutation}