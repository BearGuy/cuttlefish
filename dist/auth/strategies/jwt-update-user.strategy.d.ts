import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';
declare const JwtUpdateUserStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtUpdateUserStrategy extends JwtUpdateUserStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: any): Promise<User>;
}
export {};
