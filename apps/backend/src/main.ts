import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.json());

  app.enableCors({
    origin: ['https://ds1odkxad3v10.cloudfront.net','http://localhost:3000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, 
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
