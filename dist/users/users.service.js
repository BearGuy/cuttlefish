"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon2 = require("argon2");
let UsersService = class UsersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getUsers() {
        return this.prismaService.user.findMany();
    }
    async getUserById(id) {
        return this.prismaService.user.findUnique({ where: { id: Number(id) } });
    }
    async getUserByEmail(email) {
        return this.prismaService.user.findUnique({ where: { email } });
    }
    async createUser(userData) {
        const { email, password } = userData;
        const hash = await argon2.hash(password);
        console.log(hash);
        return this.prismaService.user.create({
            data: {
                email,
                password: hash
            }
        });
    }
    async updateUser(userData) {
        const { id, email } = userData;
        return this.prismaService.user.update({
            where: { id: Number(id) },
            data: {
                email
            }
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map