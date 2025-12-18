import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
    async createUser(data: CreateUsersRequest) {
        try {
            return await this.prismaService.user.create({
                data: {
                    ...data,
                    password: await bcrypt.hash(data.password, 10),
                },
                select: {
                    id: true,
                    email: true,
                    password: false,
                }
            })

        } catch (err) {
            if (err.code === 'P2002') {
                throw new UnprocessableEntityException('Email already exists');
            }
            throw err;
        }

    }
}
