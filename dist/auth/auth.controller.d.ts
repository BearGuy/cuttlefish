import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: any): Promise<{
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
