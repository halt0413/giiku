import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import type {
  APIGatewayProxyEventV2,
  Context,
  Callback,
  Handler,
} from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import { AppModule } from './app.module';

// Promise だけを返すように統一
type ServerHandler = (
  event: APIGatewayProxyEventV2,
  context: Context,
  callback?: Callback<unknown>,
) => Promise<unknown>;

// キャッシュ用サーバ
let server: ServerHandler | null = null;

async function bootstrap(): Promise<void> {
  const expressApp = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp) as any,
    { logger: false },
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  // @vendia/serverless-express は非同期関数を返すため Promise に統一
  server = serverlessExpress({ app: expressApp }) as unknown as ServerHandler;
}

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
  callback?: Callback<unknown>,
) => {
  if (!server) {
    await bootstrap();
  }

  const handlerFn = server;
  if (handlerFn === null) {
    throw new Error('Server initialization failed');
  }

  return handlerFn(event, context, callback);
};
