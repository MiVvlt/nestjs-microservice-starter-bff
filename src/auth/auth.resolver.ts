import {Args, Query, Mutation, Resolver, Context} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {Logger} from '@nestjs/common';
import {ILoginResponseDto, ILoginRequestDto, IRegisterResponseDto, IRegisterRequestDto, IAuthenticateResponseDto} from './dto/auth.dto';
import {ReqResContext} from './ReqResContext';
import {Public} from './decorators/is-public.decorator';

@Resolver()
export class AuthResolver {
    private readonly logger = new Logger('AuthResolver');

    constructor(private readonly authService: AuthService) {

    }

    @Public()
    @Query(() => ILoginResponseDto)
    async login(
        @Args('credentials', {type: () => ILoginRequestDto}) credentials: ILoginRequestDto,
        @Context() context: ReqResContext): Promise<ILoginResponseDto> {

        const tokens = await this.authService.login(credentials);
        context.res.cookie('srt', tokens.refreshToken, {httpOnly: true});
        return {accessToken: tokens.accessToken};
    }

    @Public()
    @Query(() => IAuthenticateResponseDto)
    async authenticate(
        @Args('accessToken', {type: () => String}) accessToken: string
    ): Promise<IAuthenticateResponseDto> {
        return await this.authService.authenticate(accessToken);
    }

    @Public()
    @Query(() => String)
    async refreshAccessToken(
        @Args('refreshToken', {type: () => String}) refreshToken: string): Promise<string> {
        return await this.authService.refreshAccessToken(refreshToken);
    }

    @Public()
    @Mutation(() => IRegisterResponseDto)
    async register(
        @Args('dto', {type: () => IRegisterRequestDto}) dto: IRegisterRequestDto
    ): Promise<IRegisterResponseDto> {
        return await this.authService.register(dto);
    }

}