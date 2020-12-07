import {Injectable, Logger} from '@nestjs/common';
import {
    IAuthenticateResponseDto,
    ILoginRequestDto,
    ILoginTokens, IMeResponseDto,
    IRegisterRequestDto,
    IRegisterResponseDto
} from './dto/auth.dto';
import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices';

@Injectable()
export class AuthService {

    private client: ClientProxy;
    private readonly logger = new Logger('AuthService');

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 3301
            }
        });

    }

    async login(dto: ILoginRequestDto): Promise<ILoginTokens> {
        return await this.client.send<ILoginTokens, ILoginRequestDto>('login', dto).toPromise()
    }

    async authenticate(accessToken: string): Promise<IAuthenticateResponseDto> {
        return await this.client.send<IAuthenticateResponseDto, string>('authenticate', accessToken).toPromise();
    }

    async refreshAccessToken(refreshToken: string): Promise<string> {

        return await this.client.send<string, string>('refreshAccessToken', refreshToken).toPromise();
    }

    async me(accessToken: string): Promise<IMeResponseDto> {
        return await this.client.send<IMeResponseDto, string>('me', accessToken).toPromise();
    }

    register(dto: IRegisterRequestDto): Promise<IRegisterResponseDto> {
        return this.client.send<IRegisterResponseDto, IRegisterRequestDto>('register', dto).toPromise();
    }
}
