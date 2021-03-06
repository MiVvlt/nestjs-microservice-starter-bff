import {
	Field,
	InputType,
	ObjectType,
} from '@nestjs/graphql';


// LOGIN

@ObjectType()
export class ILoginResponseDto {
	@Field( () => String ) accessToken: string;
}

@ObjectType()
export class ILoginTokens {
	@Field( () => String ) accessToken: string;

	@Field( () => String ) refreshToken: string;
}

@InputType()
export class ILoginRequestDto {
	@Field( () => String ) email: string;

	@Field( () => String ) password: string;
}


// REGISTER

@ObjectType()
export class IRegisterResponseDto {
	@Field( () => String ) id: string;
}

@InputType()
export class IRegisterRequestDto {
	@Field( () => String ) email: string;

	@Field( () => String ) password: string;

	@Field( () => String ) firstname: string;

	@Field( () => String ) lastname: string;
}

// AUTHENTICATE

@ObjectType()
export class IAuthenticateResponseDto {
	@Field( () => String ) id: string;

	@Field( () => [ String ] ) roles: string[];

	@Field( () => String ) email: string;
}

// ME

@ObjectType()
export class IMeResponseDto {
	@Field( () => String ) id: string;

	@Field( () => String, { nullable: true } ) firstname: string;

	@Field( () => String, { nullable: true } ) lastname: string;

	@Field( () => String, { nullable: true } ) bio: string;

	@Field( () => String, { nullable: true } ) avatar: string;

	@Field( () => String ) dateCreated: string;

	@Field( () => [ String ] ) roles: string[];

	@Field( () => String ) email: string;
}

// UPLOAD AVATAR

@InputType()
export class IUploadAvatarRequestDto {
	@Field( () => String ) avatar: string;
}

export class IUploadAvatarRequest {
	id: string;
	avatar: string;
}


// UPDATE PASSWORD
@InputType()
export class IUpdatePasswordRequestDto {
	@Field( () => String ) old: string;
	@Field( () => String ) new: string;
}

export class IUpdatePasswordRequest {
	old: string;
	new: string;
	id: string;
}

// UPDATE PROFILE
@InputType()
export class IUpdateProfileRequestDto {

	@Field( () => String, { nullable: true } ) firstname: string;

	@Field( () => String, { nullable: true } ) lastname: string;

	@Field( () => String, { nullable: true } ) bio: string;

	@Field( () => String ) email: string;

}

export class IUpdateProfileRequest {
	id: string;
	firstname: string;
	lastname: string;
	bio: string;
	email: string;
}


