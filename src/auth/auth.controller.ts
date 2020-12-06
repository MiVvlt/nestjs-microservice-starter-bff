import {Controller, HttpException, HttpStatus, Post, Req} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Request} from 'express';
import {Public} from './decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Public()
    @Post('refresh_token')
    async refreshToken(@Req() req: Request) {
        const token = req && req.cookies ? req.cookies.srt : undefined;
        if (!token) {
            throw new HttpException('No cookie available', HttpStatus.UNAUTHORIZED);
        }
        return {accessToken: await this.authService.refreshAccessToken(token)};
    }
}
