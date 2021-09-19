import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.getUserByEmail(email);
		if (user && await argon2.verify(user.password, pass)) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async validate({ id }): Promise<User> {
		const user = await this.usersService.getUserById(id);
		if (!user) throw Error('Authenticate validation error')
		return user;
	}

	async validateUpdateUser({ id, hash: old_hash, updatedAt }: any): Promise<User> {
		const user = await this.usersService.getUserById(id);
		if (user.password !== old_hash) throw Error('Authenticate validation error')
		return user
	}

	async login(user: User) {
		const payload = {
			id: user.id,
			email: user.email,
		}
		return {
			statusCode: 201,
			message: "success",
			data: {
				user: payload,
				access_token: this.jwtService.sign(payload),
			}
		}
	};

	async register(createUserDto: CreateUserDto) {
		if (await this.usersService.getUserByEmail(createUserDto.email)) {
		  	throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
		}
		const { id, email } = await this.usersService.createUser(createUserDto);
		return {
			statusCode: 201,
			message: "success",
			data: {
				user: { id, email },
				access_token: this.jwtService.sign({
					id,
					email,
				})
			}
		}
	  }
}
