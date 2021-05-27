import { getRepository } from 'typeorm';
import User from '../models/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface Request {
    password: string;
    email: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepos = getRepository(User);
        const user = await usersRepos.findOne({ where: { email } });

        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

        const token = sign({}, '44abe58705f9cbc7ec2305ae2c8754a0', {
            subject: user.id,
            expiresIn: '1d',
        });
        return {
            user,token
        };
    }
}

export default AuthenticateService;
