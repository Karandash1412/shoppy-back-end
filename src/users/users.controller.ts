import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUsersRequest } from './dto/createUsers.request';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }


    @Post()
    createUser(@Body() request: CreateUsersRequest) {
        return this.usersService.createUser(request)
    }
}
