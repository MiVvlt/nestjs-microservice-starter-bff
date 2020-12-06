import {Controller, HttpException, HttpStatus, Post, Req} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Request} from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Post('refresh_token')
    async refreshToken(@Req() req: Request) {
        const token = req && req.cookies ? req.cookies.srt : undefined;
        if (!token) {
            throw new HttpException('No cookie available', HttpStatus.UNAUTHORIZED);
        }
        return this.authService.refreshAccessToken(token);
    }
}
