import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {AuthModule} from './auth/auth.module';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import {RolesGuard} from './auth/roles.guard';
import {APP_GUARD} from '@nestjs/core';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            context: ({req, res}) => ({req, res})
        }),
        AuthModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        AuthService],
})
export class AppModule {
}
