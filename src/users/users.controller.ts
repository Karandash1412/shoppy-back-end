import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CreateUsersRequest } from './dto/createUsers.request';
import { UsersService } from './users.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';

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
}
