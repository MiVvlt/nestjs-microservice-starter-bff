import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {AuthService} from './auth.service';
import {GqlExecutionContext} from '@nestjs/graphql';
import {UnauthorizedError} from 'type-graphql';
import {Reflector} from '@nestjs/core';
import {IS_PUBLIC_KEY} from './decorators/is-public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService, private reflector: Reflector) {
    }

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const {req} = ctx.getContext();

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }
        const authorization = req ? req.headers['authorization'] : undefined;
        if (!authorization) {
            throw new UnauthorizedError();
        }
        let payload;

        try {
            const token = authorization.split(' ')[1];
            payload = await this.authService.authenticate(token);
        } catch (err) {
            throw new UnauthorizedError();
        }

        if (payload.id) {
            ctx.getContext().user = payload;
            return true;
        } else {
            throw new UnauthorizedError();
        }
    }
}


