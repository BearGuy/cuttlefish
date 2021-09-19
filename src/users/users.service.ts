import { Injectable, Logger } from '@nestjs/common';
import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
	Query,
  } from '@nestjs/common'
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async getUsers(): Promise<User[]> {
		return this.prismaService.user.findMany();
	}

	async getUserById(id: string): Promise<User> {
		return this.prismaService.user.findUnique({ where: { id: Number(id) } })
	}

	async getUserByEmail(email: string): Promise<User> {
		return this.prismaService.user.findUnique({ where: { email } })
	}

	async createUser(userData: {
		email: string,
		password: string
	}): Promise<User> {
		const { email, password } = userData;
		const hash = await argon2.hash(password);
		console.log(hash);
		return this.prismaService.user.create({
			data: {
				email,
				password: hash
			}
		})
	}

	async updateUser(userData: {
		id: string,
		email: string
	}) {
		const { id, email } = userData;
		return this.prismaService.user.update({
			where: { id: Number(id) },
			data: {
				email
			}
		})
	}
}
