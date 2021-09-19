import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    createUser(userData: {
        email: string;
        password: string;
    }): Promise<User>;
    updateUser(userData: {
        id: string;
        email: string;
    }): Promise<User>;
}
