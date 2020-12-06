import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';
import {Reflector} from '@nestjs/core';
import {Role} from './enums/role.enum';
import {ROLES_KEY} from './decorators/roles.decorator';
import {IS_PUBLIC_KEY} from './decorators/is-public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const ctx = GqlExecutionContext.create(context);
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }
        const {user} = ctx.getContext();

        return requiredRoles.some((role) => user.roles.includes(role));
    }
}


