import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    async login(user: User, response: Response) {
        const jwtExpiration = this.configService.getOrThrow<string>('JWT_EXPIRATION');
        const expirationTime = ms(jwtExpiration as any);
        const expires = new Date(Date.now() + expirationTime);

        const tokenPayload: TokenPayload = {
            userId: user.id,
        };
        const token = this.jwtService.sign(tokenPayload);

        response.cookie('Authentication', token, {
            secure: true,
            httpOnly: true,
            expires: expires,
        });

        return { tokenPayload };
    }

    async verifyUser(email: string, password: string) {
        try {
            const user = await this.usersService.getUser({ email });
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new UnauthorizedException();
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
