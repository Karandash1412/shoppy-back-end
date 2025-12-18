import { IsEmail, IsStrongPassword } from 'class-validator'

export class CreateUsersRequest {
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
}