import {getRepository } from 'typeorm';
import User from '../models/User';
import {hash } from 'bcryptjs';
interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({name, email, password}:Request): Promise<User>{
        const usersRepo = getRepository(User);

        const checkUserexists = await usersRepo.findOne({
            where: {email}
        });

        if(checkUserexists){
            throw new Error('Email already exists');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepo.create({
            name,
            email,
            password: hashedPassword
        });
        await usersRepo.save(user);

        return user;
    }
}

export default CreateUserService;
