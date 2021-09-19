import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    validate({ id }: {
        id: any;
    }): Promise<User>;
    validateUpdateUser({ id, hash: old_hash, updatedAt }: any): Promise<User>;
    login(user: User): Promise<{
        statusCode: number;
        message: string;
        data: {
            user: {
                id: number;
                email: string;
            };
            access_token: string;
        };
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            user: {
                id: number;
                email: string;
            };
            access_token: string;
        };
    }>;
}
