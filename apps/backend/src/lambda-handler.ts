import 'dotenv/config';

import express, { Express } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { APIGatewayProxyEventV2, Context, Handler, Callback } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

import { AppModule } from './app.module';

let cachedServer: ((event: any, context: Context, callback?: Callback<unknown>) => void | Promise<any>) | null = null;

async function bootstrap() {
  const expressApp: Express = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp) as any,
    { logger: false },
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  cachedServer = serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
  callback?: Callback<unknown>,
) => {
  if (!cachedServer) {
    await bootstrap();
  }

  return cachedServer!(event, context, callback);
};
