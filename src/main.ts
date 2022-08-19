import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AuthenticationGuard } from './auth/guards/auth.guard';
import { NotFoundInterceptor } from './util/interceptor/not-found.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  const config = new DocumentBuilder()
    .setTitle('Himitu API')
    .setDescription('E-commerce API for Himitu')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('explorer', app, document);
  app.useGlobalInterceptors(new NotFoundInterceptor())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
