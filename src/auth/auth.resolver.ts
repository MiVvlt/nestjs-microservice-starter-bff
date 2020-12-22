import {
	Args,
	Query,
	Mutation,
	Resolver,
	Context,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';
import * as jwtDecode from 'jwt-decode';

import {
	ILoginResponseDto,
	ILoginRequestDto,
	IRegisterResponseDto,
	IRegisterRequestDto,
	IAuthenticateResponseDto,
	IMeResponseDto,
	IUploadAvatarRequestDto,
	IUploadAvatarRequest,
} from './dto/auth.dto';
import { AuthContext } from './AuthContext';
import { Public } from './decorators/is-public.decorator';

@Resolver()
export class AuthResolver {
	private readonly logger = new Logger( 'AuthResolver' );

	constructor( private readonly authService: AuthService ) {

	}

	@Public() @Query( () => ILoginResponseDto )
	async login( @Args( 'credentials', { type: () => ILoginRequestDto } ) credentials: ILoginRequestDto,
	             @Context() context: AuthContext,
	): Promise<ILoginResponseDto> {

		// get access and refresh tokens
		const tokens = await this.authService.login( credentials );

		// cookie expires when token expires
		const expiration = ( jwtDecode.default( tokens.refreshToken ) as { exp: string } ).exp + '000';

		// set response cookie
		context.res.cookie( 'srt', tokens.refreshToken, {
			httpOnly: true,
			secure  : true,
			path    : '/',
			expires : new Date( parseInt( expiration ) ),
		} );

		// return accessToken for clients to store
		return { accessToken: tokens.accessToken };
	}

	@Mutation( () => String )
	async updateAvatar( @Args( 'avatarRequest',
	                           { type: () => IUploadAvatarRequestDto },
	) avatarRequest: IUploadAvatarRequestDto, @Context() context: AuthContext ): Promise<string> {

		const data: IUploadAvatarRequest = {
			id    : context.user.id,
			avatar: avatarRequest.avatar,
		};
		return await this.authService.updateAvatar( data );
	}

	@Public() @Query( () => IAuthenticateResponseDto )
	async authenticate( @Args( 'accessToken',
	                           { type: () => String },
	) accessToken: string ): Promise<IAuthenticateResponseDto> {
		return await this.authService.authenticate( accessToken );
	}

	@Public() @Query( () => String )
	async refreshAccessToken( @Args( 'refreshToken', { type: () => String } ) refreshToken: string ): Promise<string> {
		return await this.authService.refreshAccessToken( refreshToken );
	}

	@Public() @Mutation( () => IRegisterResponseDto )
	async register( @Args( 'dto',
	                       { type: () => IRegisterRequestDto },
	) dto: IRegisterRequestDto ): Promise<IRegisterResponseDto> {
		return await this.authService.register( dto );
	}

	@Query( () => IMeResponseDto )
	async me( @Context(){ token }: AuthContext ): Promise<IMeResponseDto> {
		return this.authService.me( token );
	}

}
