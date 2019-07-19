import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  require('dotenv').config();
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Smart Borne')
    .setDescription('The API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addTag('auth')
    .addTag('borne')
    .addTag('client')
    .addTag('data')
    .addTag('offer')
    .addTag('profile')
    .addTag('user')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
