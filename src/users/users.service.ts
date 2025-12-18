import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUsersRequest } from './dto/createUsers.request';
import { PrismaService } from 'src/prisma/prisma.service';
import type { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {

    }
    getUsers() {
        return "Hello World";
    }
    async createUser(data: CreateUsersRequest): Promise<User> {
        const user = await this.prismaService.user.create({
            data: {
                ...data,
                password: await bcrypt.hash(data.password, 10),
            }
        })
        return user;
    }
}
