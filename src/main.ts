import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cors({
        credentials: true,
        origin: 'http://localhost:4200'
    }))
    app.use(cookieParser());
    await app.listen(3300);
}

bootstrap();
