import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUsersRequest } from './dto/createUsers.request';
import { UsersService } from './users.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TokenPayload } from 'src/auth/token-payload.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }


    @Post()
    @UseInterceptors(NoFilesInterceptor())
    createUser(@Body() request: CreateUsersRequest) {
        return this.usersService.createUser(request)
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@CurrentUser() user: TokenPayload) {
        return user;
    }
}
