import { Module } from '@nestjs/common';
import {AuthResolver} from './auth.resolver';
import {AuthService} from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    providers: [AuthResolver, AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
