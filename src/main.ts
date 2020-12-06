import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.use(helmet({
        contentSecurityPolicy: false
    }));
    app.use(cors({
        origin: 'http://localhost:4200'
    }));
    await app.listen(3300);
}
bootstrap();
