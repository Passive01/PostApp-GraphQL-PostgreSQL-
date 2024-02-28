import { prismaClient } from "../lib/db"
import crypto from 'crypto';
import  jwt from 'jsonwebtoken';

export interface CreateUserPayload {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface CreateJWTPayload {
    email: string,
    password: string
}

const secret = 'JWT$ecr3t';


class UserService {
    private static hashPassword (password: string, salt: string) {
        return crypto.pbkdf2Sync(password, salt,
            1000, 64, `sha512`).toString(`hex`);
    }

    public static createUser (payload: CreateUserPayload) {
        const {firstName, lastName, email, password} = payload;
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = this.hashPassword(password, salt)
        
        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                salt
            }
        })
    }
    private static getUserByEmail ( email: string) {
        return prismaClient.user.findUnique({ where: {email}})
    }

    public static async createJwt (payload: CreateJWTPayload) {
        const {email, password} = payload
        const user = await this.getUserByEmail(email) 
        if (!user) throw new Error('User not found')
        const salt = user.salt
        const hashedPassword = this.hashPassword(password, salt)
        if (hashedPassword !== user.password){
            throw new Error ('Password in invalid')
        } 
        //Get Token
        const token = jwt.sign({id: user.id, email: user.email}, secret);
        return token
    }

    public static decodeUser (token: string) {
        const decoded = jwt.verify(token, secret);
        return decoded;
    }

    public static getUserById (id: string) {
        return prismaClient.user.findUnique({ where: {id}})
    }
}
export default UserService